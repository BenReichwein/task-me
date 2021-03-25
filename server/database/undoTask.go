package database

import (
	"context"
	"fmt"
	
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

// task undo method, update task's status to false
func UndoTask(task string) (bool, error) {
	fmt.Println(task)
	id, _ := primitive.ObjectIDFromHex(task)
	filter := bson.M{"_id": id}
	update := bson.M{"$set": bson.M{"status": false}}
	result, err := collection.UpdateOne(context.Background(), filter, update)
	if err != nil {
		return false, err
	}

	fmt.Println("modified count: ", result.ModifiedCount)
	return true, nil
}