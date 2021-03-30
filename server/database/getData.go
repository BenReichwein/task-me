package database

import (
	"context"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

// get all task from the DB and return it
func GetData(User string) ([]primitive.M, error) {
	cur, err := collection.Find(
		context.Background(), 
		bson.M{"username": "benny"})
	if err != nil {
		return nil, err
	}

	var results []primitive.M
	for cur.Next(context.Background()) {
		var result bson.M
		e := cur.Decode(&result)
		if e != nil {
			return nil, e
		}
		results = append(results, result)

	}
	// -> concurrent way
	// var results []primitive.M
	// var wg sync.WaitGroup
	// for cur.Next(context.Background()) {
	// 	wg.Add(1)
	// 	go func (cur mongo.Cursor) {
	// 		defer wg.Done()
	// 		var result bson.M
    //         cur.Decode(&result)
            
    //         results = append(results, result)
	// 	}(*cur)
	// }
	// wg.Wait()

	if err := cur.Err(); err != nil {
		return nil, err
	}
	cur.Close(context.Background())
	return results, nil
}