package database

import (
	"context"
	"server/models"

	"go.mongodb.org/mongo-driver/bson"
	"golang.org/x/crypto/bcrypt"
)

// Registers user to the database
func Register(user models.User) (models.ResponseResult) {
	var result models.User
	var res models.ResponseResult
	err := collection.FindOne(context.TODO(), bson.M{"username": user.Username}).Decode(&result)
	if err != nil {
		if err.Error() == "mongo: no documents in result" {
			hash, err := bcrypt.GenerateFromPassword([]byte(user.Password), 5)

			if err != nil {
				res.Error = "Error While Hashing Password, Try Again"
				return res
			} else {
				user.Password = string(hash)
			}

			_, err = collection.InsertOne(context.TODO(), user)
			if err != nil {
				res.Error = "Error While Creating User, Try Again"
				return res
			} else {
				res.Result = "Registration Successful"
				return res
			}
		}

		res.Error = err.Error()
		return res
	}
	res.Error = "User Already Exists"
	return res
}