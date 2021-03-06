package controllers

import (
	"encoding/json"
	"net/http"
	"server/database"
	"server/models"
)

// create task route
func CreateTask(w http.ResponseWriter, r *http.Request) {
	var task models.Task
	_ = json.NewDecoder(r.Body).Decode(&task)
	_, err := database.InsertOneTask(task, task.List)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	} else {
		json.NewEncoder(w).Encode(task)
	}
}