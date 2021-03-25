package helpers

import (
	"log"

	"github.com/joho/godotenv"
)

// load environment
func LoadDotEnv() {
	// load .env file
	err := godotenv.Load(".env")

	if err != nil {
		log.Fatalf("Error loading .env file")
	}
}