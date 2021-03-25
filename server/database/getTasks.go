package database

import (
	"context"
	"sync"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

// get all task from the DB and return it
func GetTasks() ([]primitive.M, error) {
	cur, err := collection.Find(context.Background(), bson.D{{}})
	if err != nil {
		return nil, err
	}

	var results []primitive.M
	var wg sync.WaitGroup
	for cur.Next(context.Background()) {
		wg.Add(1)
		go func (cur mongo.Cursor) {
			defer wg.Done()
			var result bson.M
            cur.Decode(&result)
            
            results = append(results, result)
		}(*cur)
	}
	wg.Wait()

	if err := cur.Err(); err != nil {
		return nil, err
	}
	cur.Close(context.Background())
	return results, nil
}