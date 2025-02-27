package routes

import (
	"film-app/controllers"
	"github.com/gin-gonic/gin"
)

type AuthRoute struct {
	ac *controllers.AuthController
}

func NewAuthRoute(ac *controllers.AuthController) *AuthRoute {
	return &AuthRoute{
		ac: ac,
	}
}

func (r *AuthRoute) Setup(router *gin.Engine) {
	auth := router.Group("/auth")
	{
		auth.POST("/register", r.ac.Register)
		auth.POST("/login", r.ac.Login)
		auth.GET("/activate", r.ac.ActivateAccount)
		auth.POST("/resend-verification", r.ac.ResendVerification)
		//auth.POST("/forgot-password", r.ac.ForgotPassword)
		auth.GET("/:provider", r.ac.RedirectToProvider)
		auth.GET("/:provider/callback", r.ac.HandleProviderCallback)
	}
}
