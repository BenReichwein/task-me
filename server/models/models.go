package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type User struct{
	ID        primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	Username  string             `json:"username"`
	Password  string             `json:"password"`
	Token     string             `json:"token"`
	Lists	  []List             `json:"lists,omitempty" bson:"lists,omitempty"`
}

type List struct {
	ID     primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	List   string             `json:"list,omitempty"` // Need to make this unique
	Tasks  []Task             `json:"tasks,omitempty" bson:"tasks,omitempty"`
}

type Task struct {
	ID     primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	Task   string             `json:"task,omitempty"`
	List   string             `json:"list,omitempty"`
	Status bool               `json:"status,omitempty"`
}

type ResponseResult struct {
	Error  string `json:"error"`
	Result string `json:"result"`
}