package database

import (
	"context"
	"fmt"
	"server/models"

	jwt "github.com/dgrijalva/jwt-go"
	"go.mongodb.org/mongo-driver/bson"
	"golang.org/x/crypto/bcrypt"
)

// Logs in user to the database
func Login(user models.User) (models.User, models.ResponseResult) {
	var result models.User
	var res models.ResponseResult

	err := collection.FindOne(context.TODO(), bson.M{"username": user.Username}).Decode(&result)

	if err != nil {
		res.Error = "Invalid username"
		return result, res
	}

	err = bcrypt.CompareHashAndPassword([]byte(result.Password), []byte(user.Password))

	if err != nil {
		res.Error = "Invalid password"
		return result, res
	}

	fmt.Println(result.ID)

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"id": result.ID,
		"username":  result.Username,
	})

	tokenString, err := token.SignedString([]byte("TaskMe4224"))

	if err != nil {
		res.Error = "Error while generating token,Try again"
		return result, res
	}

	result.Token = tokenString
	result.Password = ""
	return result, res
}