package database

import (
	"context"
	"fmt"

	"go.mongodb.org/mongo-driver/bson"
)

// undo task method, update task's status to false
func UndoTask(list string, task string) (bool, error) {
	filter := bson.M{"lists.list": bson.M{"$eq": list}}
	update := bson.M{"$set": bson.M{"lists.$.tasks."+task+".status": false}}
	result, err := collection.UpdateOne(context.Background(), filter, update)
	if err != nil {
		return false, err
	}

	fmt.Println("modified count: ", result.ModifiedCount)
	return true, nil
}