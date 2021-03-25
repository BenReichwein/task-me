package database

import (
	"context"
	"log"
	"fmt"
	"server/models"
)

// Insert one task in the DB
func InsertOneTask(task models.ToDoList) (string, error) {
	insertResult, err := collection.InsertOne(context.Background(), task)

	if err != nil {
		log.Fatal(err)
		return "Error", err
	}

	fmt.Println("Inserted a Single Record ", insertResult.InsertedID)

	return "Inserted!", nil
}