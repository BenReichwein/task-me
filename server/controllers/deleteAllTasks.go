package controllers

import (
	"encoding/json"
	"net/http"
	"server/database"
)

// DeleteAllTask delete all tasks route
func DeleteAllTask(w http.ResponseWriter, r *http.Request) {
	count, err := database.DeleteAllTask()
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	} else {
		json.NewEncoder(w).Encode(count)
	}
}