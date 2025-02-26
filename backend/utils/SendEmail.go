package utils

import (
	"github.com/joho/godotenv"
	"gopkg.in/gomail.v2"
	"log"
	"os"
)

func SendEmail(to, verificationLink string) error {
	//to, smtpHost string, smtpPort int,
	smtpHost := "smtp.gmail.com"
	smtpPort := 587
	log.Println("Verification link:", verificationLink)

	if err := godotenv.Load(); err != nil {
		log.Fatal("Error loading .env file")
	}

	// ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	// defer cancel()

	m := gomail.NewMessage()
	m.SetHeader("From", os.Getenv("EMAIL"))
	m.SetHeader("To", to)
	m.SetHeader("Subject", "[Film Trailers Web] Verify your account")
	body := "Click <a href=\"" + verificationLink + "\">here</a> to verify your account"
	log.Println("body: ", body)
	m.SetBody("text/html", body)
	//m.SetBody("text/html", "Click <a href=\""+verificationLink+"\">here</a> to verify your account")
	//log.Println(m)
	d := gomail.NewDialer(smtpHost, smtpPort, os.Getenv("EMAIL"), os.Getenv("EMAIL_PASSWORD"))

	if err := d.DialAndSend(m); err != nil {
		return err
	}

	return nil

}
