package rest

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"

	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
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
	var (
		list []db.ListingData_Status
		err  error
	)
	vars := mux.Vars(req)
	address := vars["address"]
	all := req.URL.Query().Get("all")
	if all == "true" {
		list, err = db.GetList("")
	} else {
		list, err = db.GetList(address)
	}
	utils.HandleErr(err)

	jsonData, err := json.Marshal(list)
	utils.HandleErr(err)
	res.Header().Set("Content-Type", "application/json")
	res.WriteHeader(http.StatusOK)
	res.Write(jsonData)
}

func listing(res http.ResponseWriter, req *http.Request) {
	body, err := io.ReadAll(req.Body)
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

func lend(res http.ResponseWriter, req *http.Request) {
	body, err := io.ReadAll(req.Body)
	utils.HandleErr(err)

	var executeID db.ExecuteID
	err = json.Unmarshal(body, &executeID)
	utils.HandleErr(err)

	err = db.ExecuteListing(executeID)
	if err != nil {
		utils.HandleErr(err)
		res.WriteHeader(http.StatusBadRequest) // 400 Bad Request
		res.Write([]byte(err.Error()))
	}
	res.WriteHeader(http.StatusOK)
}

func close(res http.ResponseWriter, req *http.Request) {
	body, err := io.ReadAll(req.Body)
	utils.HandleErr(err)

	var closeID db.CloseID
	err = json.Unmarshal(body, &closeID)
	utils.HandleErr(err)

	err = db.CloseListing(closeID)
	if err != nil {
		utils.HandleErr(err)
		res.WriteHeader(http.StatusBadRequest) // 400 Bad Request
		res.Write([]byte(err.Error()))
	}
	res.WriteHeader(http.StatusOK)
}

func Start() {
	fmt.Println("REST API")

	router := mux.NewRouter()
	router.HandleFunc("/documentation", documentation)
	router.HandleFunc("/register", signUp).Methods("POST")
	router.HandleFunc("/login", signIn).Methods("POST")
	router.HandleFunc("/list/{address}", getList).Methods("GET")
	router.HandleFunc("/open", listing).Methods("POST")
	router.HandleFunc("/lend", lend).Methods("POST")
	router.HandleFunc("/cancel", close).Methods("POST")
	router.HandleFunc("/close", close).Methods("POST")

	corsHandler := handlers.CORS(
		handlers.AllowedOrigins([]string{"http://localhost:3000"}),
		handlers.AllowedMethods([]string{"GET", "POST", "PUT", "DELETE", "OPTIONS"}),
		handlers.AllowedHeaders([]string{"Content-Type", "X-Requested-With", "Authorization"}),
	)

	http.ListenAndServe(":8080", corsHandler(router))
}
