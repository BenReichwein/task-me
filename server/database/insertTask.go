package database

import (
	"context"
	"fmt"
	"server/models"
)

// Insert one task in the DB
func InsertOneTask(task models.ToDoList) (bool, error) {
	insertResult, err := collection.InsertOne(context.Background(), task)

	if err != nil {
		return false, err
	}

	fmt.Println("Inserted a Single Record ", insertResult.InsertedID)

	return true, nil
}