package controllers

import (
	"encoding/json"
	"net/http"
	"server/database"
	"server/models"
)

// CreateTask create task route
func CreateTask(w http.ResponseWriter, r *http.Request) {
	var task models.User
	_ = json.NewDecoder(r.Body).Decode(&task)
	_, err := database.InsertOneTask(task)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	} else {
		json.NewEncoder(w).Encode(task)
	}
}