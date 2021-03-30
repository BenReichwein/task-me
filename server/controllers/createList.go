package controllers

import (
	"encoding/json"
	"net/http"
	"server/database"
	"server/models"
)

// create list route
func CreateList(w http.ResponseWriter, r *http.Request) {
	var list models.List
	_ = json.NewDecoder(r.Body).Decode(&list)
	_, err := database.InsertOneList(list, Username)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	} else {
		json.NewEncoder(w).Encode(list)
	}
}