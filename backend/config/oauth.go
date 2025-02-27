// config/auth.go
package config

import (
	"github.com/gin-contrib/sessions"
	"github.com/gin-contrib/sessions/cookie"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"github.com/markbates/goth"
	"github.com/markbates/goth/gothic"
	"github.com/markbates/goth/providers/google"
	"log"
	"net/http"
	"os"
)

// SetupAuth configures OAuth providers and sessions
func SetupAuth(router *gin.Engine) {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	// Khởi tạo session store cho Gin
	store := cookie.NewStore([]byte(os.Getenv("SESSION_SECRET")))
	store.Options(sessions.Options{
		Path:     "/",       // Có thể truy cập từ mọi đường dẫn
		MaxAge:   3600 * 24, // 24 giờ
		HttpOnly: true,      // Cookie không truy cập được bởi JavaScript
		Secure:   false,     // Set true trong production với HTTPS
		SameSite: http.SameSiteLaxMode,
	})
	router.Use(sessions.Sessions("gothic_session", store))

	// Khởi tạo Gothic với store
	gothic.Store = store

	// Thiết lập OAuth providers
	goth.UseProviders(
		google.New(
			os.Getenv("GOOGLE_CLIENT_ID"),
			os.Getenv("GOOGLE_CLIENT_SECRET"),
			os.Getenv("BE_URL")+"/auth/google/callback",
			"email", "profile",
		),
	)
}
