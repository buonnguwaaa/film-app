package config

import (
	"context"
	"github.com/joho/godotenv"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"log"
	"os"
	"time"
)

func ConnectDB() *mongo.Client {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	// Tạo context với timeout 10 giây
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel() // Đảm bảo hủy context khi function kết thúc

	// Kết nối tới MongoDB
	client, err := mongo.Connect(ctx, options.Client().ApplyURI(os.Getenv("MONGODB_URI")))
	if err != nil {
		log.Fatal(err)
	}

	// Kiểm tra kết nối bằng cách ping
	err = client.Ping(ctx, nil)
	if err != nil {
		log.Fatal(err)
	}

	return client
}

// Hàm helper để lấy collection
func GetCollection(client *mongo.Client, collectionName string) *mongo.Collection {
	// Truy cập database "film-app" và collection được chỉ định
	return client.Database(os.Getenv("DB_NAME")).Collection(collectionName)
}
