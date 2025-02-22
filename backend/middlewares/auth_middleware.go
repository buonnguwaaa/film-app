package middlewares

import (
	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
	"github.com/joho/godotenv"
	"os"
	"strings"
)

// AuthMiddleware là middleware kiểm tra token của user
func AuthMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		authHeader := c.GetHeader("Authorization")
		if authHeader == "" {
			c.JSON(401, gin.H{"error": "Authorization header is required"})
			c.Abort()
			return
		}

		// Check Bearer scheme
		part := strings.Split(authHeader, " ")
		if len(part) != 2 || part[0] != "Bearer" {
			c.JSON(401, gin.H{"error": "Authorization header is invalid"})
			c.Abort()
			return
		}

		err := godotenv.Load()
		if err != nil {
			c.JSON(500, gin.H{"error": "Could not load .env file"})
			c.Abort()
			return
		}

		tokenString := part[1]
		token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
			return []byte(os.Getenv("JWT_SECRET")), nil
		})
		if err != nil {
			c.JSON(401, gin.H{"error": err.Error()})
			c.Abort()
			return
		}

		claims := token.Claims.(jwt.MapClaims)
		c.Set("userId", claims["userId"])
		c.Next()
	}
}
