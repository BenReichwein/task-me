package main

import (
	"fmt"
	"log"
	"net/http"

	"server/database"
	"server/helpers"
	"server/router"
)

func main() {
	r := router.Router()
	// fs := http.FileServer(http.Dir("build"))
	// http.Handle("/", fs)
	fmt.Println("Starting server on the port 8080...")
	helpers.LoadDotEnv()
	database.Connect()

	log.Fatal(http.ListenAndServe(":8080", r))
}