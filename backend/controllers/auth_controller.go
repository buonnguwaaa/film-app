package controllers

import (
	"context"
	"film-app/models"
	"film-app/utils"
	"log"
	"os"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
	"github.com/joho/godotenv"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"golang.org/x/crypto/bcrypt"
)

// AuthController là struct chứa các phương thức xử lý logic liên quan đến đăng ký và đăng nhập
type AuthController struct {
	collection *mongo.Collection
}

// NewAuthController khởi tạo AuthController
func NewAuthController(collection *mongo.Collection) *AuthController {
	return &AuthController{collection: collection}
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
	token, err := utils.GenerateToken(newUser.Email)
	if err != nil {
		log.Fatal(err)
	}

	verificationLink := "http://localhost:5173/auth/activate?token=" + token

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
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"userId": user.ID.Hex(),
		"exp":    time.Now().Add(time.Hour * 24).Unix(),
	})

	if err := godotenv.Load(); err != nil {
		log.Fatal("Error loading .env file")
	}

	tokenString, err := token.SignedString([]byte(os.Getenv("JWT_SECRET")))
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

	email, err := utils.ParseToken(token)
	if err != nil {
		c.JSON(500, gin.H{"error": "Could not parse token"})
		return
	}

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

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

	// Send verification email
	token, err := utils.GenerateToken(input.Email)
	if err != nil {
		log.Fatal(err)
	}

	verificationLink := "http://localhost:5173/auth/activate?token=" + token

	if err := utils.SendEmail(input.Email, verificationLink); err != nil {
		c.JSON(500, gin.H{"error": "Could not send verification email"})
		return
	}

	c.JSON(200, gin.H{"message": "Resend verification email successfully"})
}
