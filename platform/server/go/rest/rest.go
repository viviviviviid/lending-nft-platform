package rest

import (
	"encoding/json"
	"net/http"
)

func documentation(rw http.ResponseWriter, r *http.Request) {
	switch r.Method {
	case http.MethodGet:
		json.NewEncoder(rw).Encode("Docs")
	}
}

func listing(rw http.ResponseWriter, r *http.Request) {
}

func delisting(rw http.ResponseWriter, r *http.Request) {
}

func buy(rw http.ResponseWriter, r *http.Request) {
}

func Start() {
	http.HandleFunc("/", documentation)
	http.ListenAndServe(":8080", nil)
}

// API
// 전부 트잭이 들어간 뒤에, 컨펌 응답이 오면 DB CURD.
// listing
// delisting
// buy -> delisting
