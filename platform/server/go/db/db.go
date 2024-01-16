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

type ListingData_Status struct {
	id         int
	Owner      string
	Collection string
	TokenId    int
	ImageUrl   string
	Amount     int
	Duration   int
	APR        int32
	Status     string
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

func GetList() {
	rows, err := db.Query("SELECT * FROM public.list ORDER BY id ASC")
	if err != nil {
		utils.HandleErr(err)
	}
	defer rows.Close()

	for rows.Next() {
		var data ListingData_Status
		err := rows.Scan(&data.id, &data.Owner, &data.Collection, &data.TokenId, &data.ImageUrl, &data.Amount, &data.Duration, &data.APR, &data.Status)
		if err != nil {
			panic(err)
		}

		// 조회된 데이터 출력 (예시)
		fmt.Printf("%+v\n", data)
	}

	// return result, err
}
