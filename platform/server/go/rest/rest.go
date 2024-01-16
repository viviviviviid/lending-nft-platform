package rest

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"

	"github.com/gorilla/handlers"
	"github.com/m/go/db"
	"github.com/m/go/utils"
)

type User struct {
	Address string
}

const (
	ErrExist = "pq: duplicate key value violates unique constraint \"users_unique\""
)

var (
	u           = User{}
	listingData = db.ListingData{}
)

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

func signIn(res http.ResponseWriter, req *http.Request) {
	// db.SignIn(address)
}

func getList(res http.ResponseWriter, req *http.Request) {
	db.GetList()
}

func listing(res http.ResponseWriter, req *http.Request) {
	body, err := io.ReadAll(req.Body)
	fmt.Printf("%s\n", body)
	utils.HandleErr(err)
	utils.HandleErr(json.Unmarshal(body, &listingData))

	err = db.OpenListing(listingData)
	if err != nil {
		utils.HandleErr(err)
		res.WriteHeader(http.StatusBadRequest) // 400 Bad Request
		res.Write([]byte(err.Error()))
	}
	res.WriteHeader(http.StatusCreated) // 201 Created
}

func delisting(res http.ResponseWriter, req *http.Request) {
}

func buy(res http.ResponseWriter, req *http.Request) {
}

func Start() {
	fmt.Println("REST API")

	router := http.NewServeMux()
	router.HandleFunc("/documentation", documentation)
	router.HandleFunc("/register", signUp)
	router.HandleFunc("/login", signIn)
	router.HandleFunc("/list", getList)
	router.HandleFunc("/open", listing)
	router.HandleFunc("/close", delisting)
	router.HandleFunc("/buy", buy)

	// CORS 미들웨어 설정
	corsHandler := handlers.CORS(
		handlers.AllowedOrigins([]string{"http://localhost:3000"}), // 클라이언트 주소
		handlers.AllowedMethods([]string{"GET", "POST", "PUT", "DELETE", "OPTIONS"}),
		handlers.AllowedHeaders([]string{"Content-Type", "X-Requested-With", "Authorization"}),
	)

	http.ListenAndServe(":8080", corsHandler(router))
}

// API
// 전부 트잭이 들어간 뒤에, 컨펌 응답이 오면 DB CURD.
// listing
// delisting
// buy -> delisting
