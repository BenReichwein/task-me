package controllers

import (
	"encoding/json"
	"net/http"
	"server/database"
	"github.com/gorilla/mux"
)

// delete one task route
func DeleteList(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)
	_, err := database.DeleteOneList(params["list"], Username)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	} else {
		json.NewEncoder(w).Encode(params["list"])
	}
}