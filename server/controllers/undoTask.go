package controllers

import (
	"encoding/json"
	"net/http"
	"server/database"
	"github.com/gorilla/mux"
)

// undo the complete task route
func UndoTask(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)
	_, err := database.UndoTask(params["list"], params["id"])
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	} else {
		json.NewEncoder(w).Encode(params["id"])
	}
}