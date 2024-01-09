package db

import (
	"database/sql"
	"fmt"

	_ "github.com/lib/pq"
	"github.com/m/go/utils"
)

var db *sql.DB

const (
	ErrExist = "pq: duplicate key value violates unique constraint \"users_unique\""
)

func InitDB() {
	var err error
	connStr := "postgres://viviviviviid:password@localhost/lending?sslmode=disable"
	db, err = sql.Open("postgres", connStr)
	utils.HandleErr(err)
	utils.HandleErr(db.Ping())
	fmt.Println("DB is connected")
}

func SignUp(addr string) {

	result, err := db.Exec("INSERT INTO users(address) VALUES($1)", addr)

	if err.Error() == ErrExist {
		// 이미 회원가입된 지갑이므로 login 하도록 지시
	}

	utils.HandleErr(err)

	fmt.Println(result)
	// 회원가입 완료 되었다는 메세지와 함께, login 하도록 지시
}

func SignIn(addr string) {

}
