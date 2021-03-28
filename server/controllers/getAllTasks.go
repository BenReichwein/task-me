package controllers

import (
	"encoding/json"
	"net/http"
	"server/database"
)

// GetAllTask get all the task route
func GetAllTask(w http.ResponseWriter, r *http.Request) {
	payload, err := database.GetTasks()
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	} else {
		json.NewEncoder(w).Encode(payload)
	}
}