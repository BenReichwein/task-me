package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type ToDoList struct {
	ID     primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	Task   string             `json:"task,omitempty"`
	Status bool               `json:"status,omitempty"`
}

type User struct{
	ID        primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	Username  string             `json:"username"`
	Password  string             `json:"password"`
	Token     string             `json:"token"`
	Tasks	  []ToDoList         `json:"tasks,omitempty" bson:"tasks,omitempty"`
}

type ResponseResult struct {
	Error  string `json:"error"`
	Result string `json:"result"`
}