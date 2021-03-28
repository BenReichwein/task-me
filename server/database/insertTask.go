package database

import (
	"context"
	"fmt"
	"server/models"
)

// Insert one task in the DB
func InsertOneTask(task models.User) (bool, error) {
	insertResult, err := authColl.InsertOne(context.Background(), task.Tasks)

	if err != nil {
		return false, err
	}

	fmt.Println("Inserted a Single Record ", insertResult.InsertedID)

	return true, nil
}