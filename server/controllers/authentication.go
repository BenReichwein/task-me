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
		res.Error = err.Error()
		json.NewEncoder(w).Encode(res)
		return
	}
	res = database.Register(user)
	if res.Error != "" {
		json.NewEncoder(w).Encode(res.Error)
	} else {
		json.NewEncoder(w).Encode(res.Result)
	}
	fmt.Println(res)
}

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
		json.NewEncoder(w).Encode(res)
	} else {
		c := &http.Cookie{
			Name: "authToken",
			Value: result.Token,
			Domain: "localhost",
			Path: "/",
			HttpOnly: true,
        	Secure:   true,
		}
		http.SetCookie(w, c)
		json.NewEncoder(w).Encode(result)
	}
}