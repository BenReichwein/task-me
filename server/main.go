package main

import (
	"fmt"
	"log"
	"net/http"
	"github.com/rs/cors"

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

	c := cors.New(cors.Options{
        AllowedOrigins: []string{"http://localhost:3000"},
		AllowedMethods: []string{"GET", "HEAD", "POST", "PUT", "DELETE", "OPTIONS"},
        AllowCredentials: true,
		AllowedHeaders: []string{"X-Requested-With", "Content-Type"},
    })

    handler := c.Handler(r)

	log.Fatal(http.ListenAndServe(":8080", handler))
}