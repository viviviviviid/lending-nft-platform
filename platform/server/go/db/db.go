package db

import (
	"database/sql"
	"fmt"

	_ "github.com/lib/pq"
	"github.com/m/go/utils"
)

type ListingData struct {
	Owner      string
	Collection string
	TokenId    int
	ImageUrl   string
	Amount     int
	Duration   int
	APR        int32
}

var db *sql.DB

func InitDB() {
	var err error
	connStr := "postgres://viviviviviid:password@localhost/lending?sslmode=disable"
	db, err = sql.Open("postgres", connStr)
	utils.HandleErr(err)
	utils.HandleErr(db.Ping())
	fmt.Println("DB is connected")
}

func SignUp(addr string) (string, error) {
	_, err := db.Exec("INSERT INTO users(address) VALUES($1)", addr)

	if err != nil {
		return "", err
	}
	return "register complete", nil
}

func SignIn(addr string) {

}

func OpenListing(data ListingData) error {
	_, err := db.Exec(`INSERT INTO list(owner, collection, "tokenId", image, amount, duration, "APR", status) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`, data.Owner, data.Collection, data.TokenId, data.ImageUrl, data.Amount, data.Duration, data.APR, "open")
	return err
}
