package database

import (
	"context"
	"log"
	"fmt"
	
	"go.mongodb.org/mongo-driver/bson"
)

// delete all the tasks from the DB
func DeleteAllTask() (int64, error) {
	d, err := collection.DeleteMany(context.Background(), bson.D{{}}, nil)
	if err != nil {
		log.Fatal(err)
		return 0, err
	}

	fmt.Println("Deleted Document", d.DeletedCount)
	return d.DeletedCount, nil
}