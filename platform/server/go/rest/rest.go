package rest

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"

	"github.com/m/go/db"
	"github.com/m/go/utils"
)

type User struct {
	Address string
}

var u = User{}

func documentation(rw http.ResponseWriter, r *http.Request) {
	switch r.Method {
	case http.MethodGet:
		json.NewEncoder(rw).Encode("Docs")
	}
}

func signUp(res http.ResponseWriter, req *http.Request) {
	if req.Method == "POST" {
		body, err := io.ReadAll(req.Body)
		utils.HandleErr(err)
		utils.HandleErr(json.Unmarshal(body, &u))
		db.SignUp(u.Address)
	}
}

func signIn(rw http.ResponseWriter, r *http.Request) {
	// db.SignIn(address)
}

func listing(rw http.ResponseWriter, r *http.Request) {
}

func delisting(rw http.ResponseWriter, r *http.Request) {
}

func buy(rw http.ResponseWriter, r *http.Request) {
}

func Start() {
	fmt.Println("REST API")
	http.HandleFunc("/documentation", documentation)
	http.HandleFunc("/register", signUp)
	http.HandleFunc("/login", signIn)
	http.HandleFunc("/listing", listing)
	http.HandleFunc("/delisting", delisting)
	http.HandleFunc("/buy", buy)
	http.ListenAndServe(":8080", nil)
}

// API
// 전부 트잭이 들어간 뒤에, 컨펌 응답이 오면 DB CURD.
// listing
// delisting
// buy -> delisting
