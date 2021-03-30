package database

import (
	"context"
	"fmt"
	"server/models"

	"go.mongodb.org/mongo-driver/bson"
)

// Insert one list in the DB
func InsertOneList(list models.List, User string) (bool, error) {
	filter := bson.M{"username": bson.M{"$eq": User}}
	update := bson.M{"$push": bson.M{"lists": list}}
	result, err := collection.UpdateOne(
        context.Background(),
        filter,
        update,
    )
	if err != nil {
		fmt.Println(err)
		return false, err
	}

	fmt.Println("Inserted a LIST Record ", result)
	return true, nil
}