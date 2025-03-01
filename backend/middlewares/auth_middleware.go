package middlewares

import (
	"film-app/services"

	"log"
	"strings"

	"github.com/gin-gonic/gin"
)

// AuthMiddleware là middleware kiểm tra token của user
func AuthMiddleware() gin.HandlerFunc {
	jwtService, err := services.NewJWTService()
	if err != nil {
		log.Printf("Error loading JWT service: %v", err)
		return func(c *gin.Context) {
			c.JSON(500, gin.H{"error": "Error loading JWT service"})
			c.Abort()
			return
		}
	}

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

		tokenString := part[1]
		userId, err := jwtService.ParseAccessToken(tokenString)
		if err != nil {
			c.JSON(401, gin.H{"error": "Invalid token"})
			c.Abort()
			return
		}

		c.Set("userId", userId)
		c.Next()
	}
}
