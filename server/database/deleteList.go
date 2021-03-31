package database

import (
	"context"
	"fmt"
	
	"go.mongodb.org/mongo-driver/bson"
)

// delete one list from the DB, delete by ID
func DeleteOneList(list string, User string) (bool, error) {
	// Un sets array and turns to nil
	filter := bson.M{"username": bson.M{"$eq": User}}
	update := bson.M{"$unset": bson.M{"lists."+list: 1}}
	_, err := collection.UpdateMany(context.Background(), filter, update)
	if err != nil {
		return false, err
	}
	// removes all arrays that have value of nil
	fil := bson.M{"username": bson.M{"$eq": User}}
	upd := bson.M{"$pull": bson.M{"lists": nil}}
	result, err := collection.UpdateOne(context.Background(), fil, upd)
	if err != nil {
		return false, err
	}

	fmt.Println("Deleted Document", result.ModifiedCount)
	return true, nil
}