package router

import (
	"server/handler"

	"github.com/gorilla/mux"
)

// Router is exported and used in main.go
func Router() *mux.Router {

	router := mux.NewRouter()

	router.HandleFunc("/api/task", handler.GetAllTask).Methods("GET", "OPTIONS")
	router.HandleFunc("/api/task", handler.CreateTask).Methods("POST", "OPTIONS")
	router.HandleFunc("/api/task/{id}", handler.TaskComplete).Methods("PUT", "OPTIONS")
	router.HandleFunc("/api/undoTask/{id}", handler.UndoTask).Methods("PUT", "OPTIONS")
	router.HandleFunc("/api/deleteTask/{id}", handler.DeleteTask).Methods("DELETE", "OPTIONS")
	router.HandleFunc("/api/deleteAllTask", handler.DeleteAllTask).Methods("DELETE", "OPTIONS")
	return router
}