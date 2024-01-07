package db

import (
	"database/sql"
	"fmt"

	_ "github.com/lib/pq"
	"github.com/m/go/utils"
)

var db *sql.DB

func InitDB() {

	var err error

	connStr := "postgres://viviviviviid:password@localhost/lending?sslmode=disable"
	db, err = sql.Open("postgres", connStr)
	utils.HandleErr(err)
	utils.HandleErr(db.Ping())
	fmt.Println("DB is connected")

	result, err := db.Exec("INSERT INTO users(address) VALUES('asdafwasdsada')")
	utils.HandleErr(err)
	fmt.Println(result)

}
