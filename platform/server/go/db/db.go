package db

import (
	"database/sql"
	"fmt"
	"strings"

	_ "github.com/lib/pq"
	"github.com/m/go/utils"
)

type ListingData struct {
	Poster     string
	Collection string
	TokenId    int
	ImageUrl   string
	Amount     int
	Duration   int
	APR        int32
}

type ListingData_Status struct {
	id         int
	Poster     string
	Collection string
	TokenId    int
	ImageUrl   string
	Amount     int
	Duration   int
	APR        int32
	Status     string
}

var (
	db   *sql.DB
	rows *sql.Rows
	err  error
)

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
	_, err := db.Exec(`INSERT INTO list(poster, collection, "tokenId", image, amount, duration, "APR", status) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`, data.Poster, data.Collection, data.TokenId, data.ImageUrl, data.Amount, data.Duration, data.APR, "open")
	return err
}

func GetList(address string) ([]ListingData_Status, error) {
	lowercaseAddress := strings.ToLower(address)
	if address == "" {
		rows, err = db.Query("SELECT * FROM public.list WHERE status = 'open' ORDER BY id ASC")
	} else {
		rows, err = db.Query(`SELECT * FROM list WHERE status = 'open' AND poster = $1 ORDER BY id ASC`, lowercaseAddress)
	}

	utils.HandleErr(err)
	defer rows.Close()

	var list []ListingData_Status
	for rows.Next() {
		var data ListingData_Status
		err := rows.Scan(&data.id, &data.Poster, &data.Collection, &data.TokenId, &data.ImageUrl, &data.Amount, &data.Duration, &data.APR, &data.Status)
		if err != nil {
			return nil, err
		}
		list = append(list, data)
	}
	return list, err
}

// func CloseListing(listingIndex int) error {
// 	// _, err := db.Exec(`INSERT INTO list(poster, collection, "tokenId", image, amount, duration, "APR", status) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`, data.Poster, data.Collection, data.TokenId, data.ImageUrl, data.Amount, data.Duration, data.APR, "open")
// 	// return err
// }
