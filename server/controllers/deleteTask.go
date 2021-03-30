package controllers

import (
	"encoding/json"
	"net/http"
	"server/database"
	"github.com/gorilla/mux"
)

// delete one task route
func DeleteTask(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)
	_, err := database.DeleteOneTask(params["id"])
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	} else {
		json.NewEncoder(w).Encode(params["id"])
	}
}