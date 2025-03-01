package services

import (
	"errors"
	"github.com/joho/godotenv"
	"log"
	"os"
	"time"

	"github.com/golang-jwt/jwt/v5"
)

type JWTService struct {
	secretKey []byte
}

func NewJWTService() (*JWTService, error) {
	if err := godotenv.Load(); err != nil {
		log.Fatal("Error loading .env file")
	}

	return &JWTService{
		secretKey: []byte(os.Getenv("JWT_SECRET")),
	}, nil
}

func (s *JWTService) GenerateVerificationToken(email string) (string, error) {
	claims := jwt.MapClaims{
		"email": email,
		"type":  "verification",
		"exp":   time.Now().Add(time.Hour * 24).Unix(),
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	tokenString, err := token.SignedString(s.secretKey)
	if err != nil {
		return "", err
	}

	return tokenString, nil
}

func (s JWTService) GenerateAccessToken(userId string) (string, error) {
	claims := jwt.MapClaims{
		"userId": userId,
		"type":   "access",
		"exp":    time.Now().Add(time.Hour * 24).Unix(),
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	tokenString, err := token.SignedString(s.secretKey)
	if err != nil {
		return "", err
	}

	return tokenString, nil
}

func (s *JWTService) ParseVerificationToken(tokenString string) (string, error) {
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		return s.secretKey, nil
	})
	if err != nil {
		return "", err
	}

	claims, ok := token.Claims.(jwt.MapClaims)
	if !ok {
		return "", err
	}

	email, ok := claims["email"].(string)
	if !ok {
		return "", err
	}

	return email, nil
}

func (s *JWTService) ParseAccessToken(tokenString string) (string, error) {
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		// Kiểm tra thuật toán
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, jwt.ErrSignatureInvalid
		}
		return s.secretKey, nil
	})

	if err != nil {
		return "", err
	}

	// Trích xuất payload
	claims, ok := token.Claims.(jwt.MapClaims)
	if !ok || !token.Valid {
		return "", errors.New("invalid token")
	}

	// Kiểm tra loại token
	tokenType, ok := claims["type"].(string)
	if !ok || tokenType != "access" {
		return "", errors.New("invalid token type")
	}

	// Trích xuất userID
	userID, ok := claims["userId"].(string)
	if !ok {
		return "", errors.New("invalid token claims")
	}

	return userID, nil
}
func (s *JWTService) GenerateRefreshToken(userId string) (string, error) {
	claims := jwt.MapClaims{
		"userId": userId,
		"type":   "refresh",
		"exp":    time.Now().Add(time.Hour * 24 * 7).Unix(), // Refresh token valid for 7 days
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	tokenString, err := token.SignedString(s.secretKey)
	if err != nil {
		return "", err
	}

	return tokenString, nil
}

func (s *JWTService) GenerateNewAccessTokenFromRefreshToken(refreshTokenString string) (string, error) {
	token, err := jwt.Parse(refreshTokenString, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, jwt.ErrSignatureInvalid
		}
		return s.secretKey, nil
	})

	if err != nil {
		return "", err
	}

	claims, ok := token.Claims.(jwt.MapClaims)
	if !ok || !token.Valid {
		return "", errors.New("invalid token")
	}

	tokenType, ok := claims["type"].(string)
	if !ok || tokenType != "refresh" {
		return "", errors.New("invalid token type")
	}

	userId, ok := claims["userId"].(string)
	if !ok {
		return "", errors.New("invalid token claims")
	}

	return s.GenerateAccessToken(userId)
}
