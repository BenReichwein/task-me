package database

import (
	"context"
	"fmt"
	
	"go.mongodb.org/mongo-driver/bson"
)

// delete one task from the DB, delete by ID
func DeleteOneTask(list string, task string) (bool, error) {
	// Un sets array and turns to nil
	filter := bson.M{"lists.list": bson.M{"$eq": list}}
	update := bson.M{"$unset": bson.M{"lists.$.tasks."+task: task}}
	_, err := collection.UpdateOne(context.Background(), filter, update)
	if err != nil {
		return false, err
	}
	// removes all arrays that have value of nil
	fil := bson.M{"lists.list": bson.M{"$eq": list}}
	upd := bson.M{"$pull": bson.M{"lists.$.tasks": nil}}
	result, err := collection.UpdateOne(context.Background(), fil, upd)
	if err != nil {
		return false, err
	}

	fmt.Println("Deleted Document", result.ModifiedCount)
	return true, nil
}