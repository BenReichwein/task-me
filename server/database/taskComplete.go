package database

import (
	"context"
	"fmt"

	"go.mongodb.org/mongo-driver/bson"
)

// task complete method, update task's status to true
func TaskComplete(list string, task string) (bool, error) {
	filter := bson.M{"lists.list": bson.M{"$eq": list}}
	update := bson.M{"$set": bson.M{"lists.$.tasks."+task+".status": true}}
	result, err := collection.UpdateOne(context.Background(), filter, update)
	if err != nil {
		return false, err
	}

	fmt.Println("modified count: ", result.ModifiedCount)
	return true, nil
}