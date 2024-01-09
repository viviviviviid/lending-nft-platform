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

const (
	ErrExist = "pq: duplicate key value violates unique constraint \"users_unique\""
)

var u = User{}

func documentation(rw http.ResponseWriter, r *http.Request) {
	switch r.Method {
	case http.MethodGet:
		json.NewEncoder(rw).Encode("Docs")
	}
}

func signUp(res http.ResponseWriter, req *http.Request) {
	body, err := io.ReadAll(req.Body)
	utils.HandleErr(err)
	utils.HandleErr(json.Unmarshal(body, &u))

	result, err := db.SignUp(u.Address)
	if err != nil {
		switch err.Error() {
		case ErrExist:
			res.WriteHeader(http.StatusOK) // 200 OK
			res.Write([]byte("Already Exist Account. Please Login First"))
		default:
			res.WriteHeader(http.StatusBadRequest) // 400 Bad Request
			res.Write([]byte(err.Error()))
		}
	} else {
		res.WriteHeader(http.StatusCreated) // 201 Created
		res.Write([]byte(result))
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
