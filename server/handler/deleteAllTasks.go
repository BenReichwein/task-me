package handler

import (
	"encoding/json"
	"net/http"
	"server/database"
)

// DeleteAllTask delete all tasks route
func DeleteAllTask(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Context-Type", "application/x-www-form-urlencoded")
	w.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
	w.Header().Set("Access-Control-Allow-Credentials", "true")
	count, err := database.DeleteAllTask()
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	} else {
		json.NewEncoder(w).Encode(count)
	}
}