package utils

import (
	"github.com/golang-jwt/jwt/v5"
	"github.com/joho/godotenv"
	"os"
	"time"
)

// GenerateToken tạo JWT từ email và trả về token dạng string
func GenerateToken(email string) (string, error) {
	// Tạo claims chứa email & thời gian hết hạn (60 phút)
	claims := jwt.MapClaims{
		"email": email,
		"exp":   time.Now().Add(time.Hour).Unix(), // Token hết hạn sau 1 giờ
	}

	// Tạo token mới
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	// Ký token với secret key
	if err := godotenv.Load(); err != nil {
		return "", err
	}
	tokenString, err := token.SignedString([]byte(os.Getenv("JWT_SECRET")))

	if err != nil {
		return "", err
	}

	return tokenString, nil
}
