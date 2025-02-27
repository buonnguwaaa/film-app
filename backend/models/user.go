package models

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type User struct {
	// ObjectID là kiểu ID đặc biệt của MongoDB nên phải import thư viện vào
	ID primitive.ObjectID `json:"id" bson:"_id,omitempty"`
	// omitempty: bỏ qua field này nếu giá trị rỗng

	Username string `json:"username" bson:"username"`

	Email       string `json:"email" bson:"email"`
	Password    string `json:"password" bson:"password"`
	IsActivated bool   `json:"is_activated" bson:"is_activated" default:"false"`
	Avatar      string `json:"avatar" bson:"avatar"`
}
