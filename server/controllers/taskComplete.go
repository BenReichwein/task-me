package controllers

import (
	"encoding/json"
	"net/http"
	"server/database"
	"github.com/gorilla/mux"
)

// TaskComplete update task route
func TaskComplete(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)
	_, err := database.TaskComplete(params["id"])
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	} else {
		json.NewEncoder(w).Encode(params["id"])
	}
}