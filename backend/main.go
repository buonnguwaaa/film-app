package main

import (
	"film-app/config"
	"film-app/controllers"
	"film-app/routes"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"log"
	"os"
)

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	router := gin.Default()

	c := cors.New(cors.Config{
		AllowOrigins: []string{os.Getenv("FE_URL")},
		AllowMethods: []string{"GET", "POST", "PUT", "DELETE"},
		AllowHeaders: []string{"Content-Type"},
	})
	router.Use(c)

	// Connect to database
	client := config.ConnectDB()
	userCollection := config.GetCollection(client, "users")

	// Initialize controllers
	authController := controllers.NewAuthController(userCollection)

	// Setup routes
	authRoute := routes.NewAuthRoute(authController)
	authRoute.Setup(router)

	router.Run(":" + os.Getenv("PORT"))
}
