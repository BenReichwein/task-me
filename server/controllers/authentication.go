package controllers

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"server/database"
	"server/models"
)

// Registers user
func RegisterHandler(w http.ResponseWriter, r *http.Request) {

	w.Header().Set("Content-Type", "application/json")
	var user models.User
	body, _ := ioutil.ReadAll(r.Body)
	err := json.Unmarshal(body, &user)
	var res models.ResponseResult
	if err != nil {
		res.Error = err.Error()
		json.NewEncoder(w).Encode(res)
		return
	}

	if err != nil {
		http.Error(w, "Error, Try Again", http.StatusForbidden)
		return
	}
	res = database.Register(user)
	if res.Error != "" {
		http.Error(w, res.Error, http.StatusForbidden)
	} else {
		json.NewEncoder(w).Encode(res.Result)
	}
	fmt.Println(res)
}
// Logs in user
func LoginHandler(w http.ResponseWriter, r *http.Request) {

	w.Header().Set("Content-Type", "application/json")
	var user models.User
	body, _ := ioutil.ReadAll(r.Body)
	err := json.Unmarshal(body, &user)
	if err != nil {
		log.Fatal(err)
	}


	if err != nil {
		log.Fatal(err)
	}

	result, res := database.Login(user)
	if res.Error != "" {
		http.Error(w, res.Error, http.StatusForbidden)
	} else {
		c := &http.Cookie{
			Name: "authToken",
			Value: result.Token,
			Path: "/",
			HttpOnly: true,
        	Secure:   true,
			SameSite: http.SameSiteNoneMode,
		}
		http.SetCookie(w, c)
		json.NewEncoder(w).Encode(result)
	}
}