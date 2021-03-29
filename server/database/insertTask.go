package database

import (
	"context"
	"fmt"
	"server/models"

	"go.mongodb.org/mongo-driver/bson"
)

// Insert one task in the DB
func InsertOneTask(task models.ToDoList, User string) (bool, error) {
	filter := bson.M{"username": bson.M{"$eq": User}}
	update := bson.M{"$push": bson.M{"tasks": task}}
	result, err := collection.UpdateOne(
        context.Background(),
        filter,
        update,
    )
	if err != nil {
		fmt.Println(err)
		return false, err
	}

	fmt.Println("Inserted a Single Record ", result)
	return true, nil
}