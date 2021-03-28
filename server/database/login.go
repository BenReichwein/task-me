package database

import (
	"context"
	"server/models"

	"go.mongodb.org/mongo-driver/bson"
	"golang.org/x/crypto/bcrypt"
	jwt "github.com/dgrijalva/jwt-go"
)

// Logs in user to the database
func Login(user models.User) (models.User, models.ResponseResult) {
	var result models.User
	var res models.ResponseResult

	err := authColl.FindOne(context.TODO(), bson.M{"username": user.Username}).Decode(&result)

	if err != nil {
		res.Error = "Invalid username"
		return result, res
	}

	err = bcrypt.CompareHashAndPassword([]byte(result.Password), []byte(user.Password))

	if err != nil {
		res.Error = "Invalid password"
		return result, res
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"id": result.ID,
		"username":  result.Username,
	})

	tokenString, err := token.SignedString([]byte("secret"))

	if err != nil {
		res.Error = "Error while generating token,Try again"
		return result, res
	}

	_, err = authColl.UpdateOne(
		context.TODO(),
		bson.M{"username": user.Username},
		bson.D{
			{"$set", bson.D{{Key: "token", Value: tokenString}}},
		},
	)
	if err != nil {
		res.Error = "Error While Adding Token, Try Again"
		return result, res
	}

	result.Token = tokenString
	result.Password = ""
	return result, res
}