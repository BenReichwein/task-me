package controllers

import (
	"encoding/json"
	"net/http"
	"server/database"
)

// get all the task route
func GetData(w http.ResponseWriter, r *http.Request) {
	payload, err := database.GetData(Username)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	} else {
		json.NewEncoder(w).Encode(payload)
	}
}