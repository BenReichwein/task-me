package database

import (
	"context"
	"fmt"
	"server/models"

	"go.mongodb.org/mongo-driver/bson"
)

// Insert one task in the DB
func InsertOneTask(task models.Task, list string) (bool, error) {
	filter := bson.M{"lists.list": bson.M{"$eq": list}}
	update := bson.M{"$push": bson.M{"lists.$.tasks": task}}
	result, err := collection.UpdateOne(
        context.Background(),
        filter,
        update,
    )
	if err != nil {
		fmt.Println(err)
		return false, err
	}

	fmt.Println("Inserted a TASK Record ", result)
	return true, nil
}