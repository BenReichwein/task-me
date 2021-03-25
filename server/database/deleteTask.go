package database

import (
	"context"
	"log"
	"fmt"
	
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

// delete one task from the DB, delete by ID
func DeleteOneTask(task string) (string, error) {
	fmt.Println(task)
	id, _ := primitive.ObjectIDFromHex(task)
	filter := bson.M{"_id": id}
	d, err := collection.DeleteOne(context.Background(), filter)
	if err != nil {
		log.Fatal(err)
		return "Error", err
	}

	fmt.Println("Deleted Document", d.DeletedCount)
	return "Deleted", nil
}