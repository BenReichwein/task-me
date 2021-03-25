package database

import (
	"context"
	"log"
	"fmt"
	
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

// delete one task from the DB, delete by ID
func DeleteOneTask(task string) (bool, error) {
	fmt.Println(task)
	id, e := primitive.ObjectIDFromHex(task)
	if e != nil {
		// Cant do anything without id so exits program
		log.Fatal(e)
	}
	filter := bson.M{"_id": id}
	d, err := collection.DeleteOne(context.Background(), filter)
	if err != nil {
		return false, err
	}

	fmt.Println("Deleted Document", d.DeletedCount)
	return true, nil
}