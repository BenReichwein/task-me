package router

import (
	"server/controllers"

	"github.com/gorilla/mux"
)

// Router is exported and used in main.go
func Router() *mux.Router {

	router := mux.NewRouter()

	router.HandleFunc("/api/data", controllers.GetData).Methods("GET", "OPTIONS")
	router.HandleFunc("/api/getToken", controllers.GetToken).Methods("GET", "OPTIONS")
	router.HandleFunc("/api/list", controllers.CreateList).Methods("POST", "OPTIONS")
	router.HandleFunc("/api/task", controllers.CreateTask).Methods("POST", "OPTIONS")
	router.HandleFunc("/api/user/login", controllers.LoginHandler).Methods("POST", "OPTIONS")
	router.HandleFunc("/api/user/register", controllers.RegisterHandler).Methods("POST", "OPTIONS")
	router.HandleFunc("/api/task/{list}/{id}", controllers.TaskComplete).Methods("PUT", "OPTIONS")
	router.HandleFunc("/api/undoTask/{list}/{id}", controllers.UndoTask).Methods("PUT", "OPTIONS")
	router.HandleFunc("/api/deleteTask/{list}/{id}", controllers.DeleteTask).Methods("DELETE", "OPTIONS")
	router.HandleFunc("/api/deleteAllTask", controllers.DeleteAllTask).Methods("DELETE", "OPTIONS")
	return router
}