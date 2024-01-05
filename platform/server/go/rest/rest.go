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

func Start() {
	http.HandleFunc("/", documentation)
	http.ListenAndServe(":8080", nil)
}
