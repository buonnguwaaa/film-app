package controllers

import (
	"context"
	"film-app/models"
	"film-app/services"
	"film-app/utils"
	"fmt"
	"log"
	"net/http"
	"net/url"
	"os"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/markbates/goth/gothic"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"golang.org/x/crypto/bcrypt"
)

// AuthController là struct chứa các phương thức xử lý logic liên quan đến đăng ký và đăng nhập
type AuthController struct {
	collection *mongo.Collection
	jwtService *services.JWTService
}

// NewAuthController khởi tạo AuthController
func NewAuthController(collection *mongo.Collection) *AuthController {
	jwtService, err := services.NewJWTService()
	if err != nil {
		log.Fatal("Error loading JWT service")
	}

	return &AuthController{
		collection: collection,
		jwtService: jwtService,
	}
}

type RegisterInput struct {
	Username string `json:"username" binding:"required"`
	Email    string `json:"email" binding:"required"`
	Password string `json:"password" binding:"required"`
}

type LoginInput struct {
	Email    string `json:"email" binding:"required"`
	Password string `json:"password" binding:"required"`
}

func (ac *AuthController) Register(c *gin.Context) {
	var input RegisterInput
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	// Check if email is existed
	var existingUser models.User
	err := ac.collection.FindOne(ctx, bson.M{"$or": []bson.M{{"email": input.Email}, {"username": input.Username}}}).Decode(&existingUser)
	if err == nil {
		c.JSON(500, gin.H{"error": "Email or username already existed"})
		return
	}

	// Hash password
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(input.Password), bcrypt.DefaultCost)
	if err != nil {
		c.JSON(500, gin.H{"error": "Could not hash password"})
		return
	}

	newUser := models.User{
		Username: input.Username,
		Email:    input.Email,
		Password: string(hashedPassword),
	}

	result, err := ac.collection.InsertOne(ctx, newUser)
	if err != nil {
		c.JSON(500, gin.H{"error": "Could not create new user"})
		return
	}

	c.JSON(200, gin.H{
		"message": "Registration successful",
		"userId":  result.InsertedID,
		"email":   newUser.Email,
	})

	// Send verification email
	token, err := ac.jwtService.GenerateVerificationToken(newUser.Email)
	if err != nil {
		log.Fatal(err)
	}

	verificationLink := os.Getenv("FE_URL") + "/auth/activate?token=" + token

	if err := utils.SendEmail(newUser.Email, verificationLink); err != nil {
		c.JSON(500, gin.H{"error": "Could not send verification email"})
		return
	}
}

func (ac *AuthController) Login(c *gin.Context) {
	var input LoginInput
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	// Check if user is existed
	var user models.User
	err := ac.collection.FindOne(ctx, bson.M{"email": input.Email}).Decode(&user)
	if err != nil {
		c.JSON(500, gin.H{"error": "Invalid email or password"})
		return
	}

	// Verify password
	if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(input.Password)); err != nil {
		c.JSON(400, gin.H{"error": "Invalid email or password"})
		return
	}

	// Generate JWT token
	tokenString, err := ac.jwtService.GenerateAccessToken(user.ID.Hex())
	if err != nil {
		c.JSON(500, gin.H{"error": "Could not generate token"})
		return
	}

	c.JSON(200, gin.H{
		"token": tokenString,
		"user": gin.H{
			"id":       user.ID,
			"username": user.Username,
			"email":    user.Email,
		},
	})
}

func (ac *AuthController) ActivateAccount(c *gin.Context) {
	token := c.Query("token")
	if token == "" {
		c.JSON(400, gin.H{"error": "Token is required"})
		return
	}

	email, err := ac.jwtService.ParseVerificationToken(token)
	if err != nil {
		c.JSON(500, gin.H{"error": "Could not parse token"})
		return
	}

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	// Check if account is already activated
	err = ac.collection.FindOne(ctx, bson.M{"email": email, "is_activated": false}).Err()
	if err != nil {
		c.JSON(500, gin.H{"error": "Account is already activated"})
		return
	}

	_, err = ac.collection.UpdateOne(ctx, bson.M{"email": email}, bson.M{"$set": bson.M{"is_activated": true}})
	if err != nil {
		c.JSON(500, gin.H{"error": "Could not activate account"})
		return
	}

	c.JSON(200, gin.H{"message": "Account activated"})
}

func (ac *AuthController) ResendVerification(c *gin.Context) {
	var input struct {
		Email string `json:"email" binding:"required"`
	}

	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	err := ac.collection.FindOne(ctx, bson.M{"email": input.Email, "is_activated": false}).Err()
	if err != nil {
		c.JSON(500, gin.H{"error": "Account is already activated"})
		return
	}

	// Send verification email
	token, err := ac.jwtService.GenerateVerificationToken(input.Email)
	if err != nil {
		log.Fatal(err)
	}

	verificationLink := os.Getenv("FE_URL") + "/auth/activate?token=" + token

	if err := utils.SendEmail(input.Email, verificationLink); err != nil {
		c.JSON(500, gin.H{"error": "Could not send verification email"})
		return
	}

	c.JSON(200, gin.H{"message": "Resend verification email successfully"})
}

func (ac *AuthController) RedirectToProvider(c *gin.Context) {
	provider := c.Param("provider")
	c.Request.URL.RawQuery = "provider=" + provider
	gothic.BeginAuthHandler(c.Writer, c.Request)
}

func (ac *AuthController) HandleProviderCallback(c *gin.Context) {
	user, err := gothic.CompleteUserAuth(c.Writer, c.Request)
	if err != nil {
		log.Printf("OAuth Error: %v", err)
		c.JSON(500, gin.H{"error": "Could not complete OAuth"})
		return
	}

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	// Check if user is existed
	var currentUser models.User
	err = ac.collection.FindOne(ctx, bson.M{"email": user.Email}).Decode(&currentUser)
	if err == mongo.ErrNoDocuments {
		newUser := models.User{
			Username:    user.Name,
			Email:       user.Email,
			Password:    "", // OAuth users won't have a password
			IsActivated: true,
		}
		result, err := ac.collection.InsertOne(ctx, newUser)
		if err != nil {
			c.JSON(500, gin.H{"error": "Could not create new user"})
			return
		}

		// Luu thông tin user mới tạo vào struct currentUser để tạo token
		currentUser.ID = result.InsertedID.(primitive.ObjectID)
		currentUser.Username = newUser.Username
		currentUser.Email = newUser.Email
		currentUser.IsActivated = newUser.IsActivated

	} else if err != nil {
		// Lỗi database khác
		c.JSON(500, gin.H{"error": "Database error", "details": err.Error()})
		return
	}

	// Generate JWT token
	tokenString, err := ac.jwtService.GenerateAccessToken(currentUser.ID.Hex())
	if err != nil {
		c.JSON(500, gin.H{"error": "Could not generate token"})
		return
	}

	c.Redirect(http.StatusTemporaryRedirect, fmt.Sprintf(
		"%s/auth/oauth-callback?token=%s&userId=%s&username=%s&email=%s",
		os.Getenv("FE_URL"),
		tokenString,
		url.QueryEscape(currentUser.ID.Hex()),
		url.QueryEscape(currentUser.Username),
		url.QueryEscape(currentUser.Email),
	))
}
