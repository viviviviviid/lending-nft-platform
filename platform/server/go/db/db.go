package db

import (
	"database/sql"
	"fmt"

	_ "github.com/lib/pq"
)

const (
	host     = "localhost"
	port     = 5432
	user     = "viviviviviid"
	password = ""
	dbname   = "postgres"
)

func Start() {
	// 밑 정보가 제대로 들어가있는지 확인하기. 왜 데이터베이스 viviviviviid가 존재하지 않는지 에러가 뜨는게 이해가 안됨
	psqlInfo := fmt.Sprintf("host=%s port=%d user=%s "+
		"password=%s dbname=%s sslmode=disable",
		host, port, user, password, dbname)
	db, err := sql.Open("postgres", psqlInfo)
	if err != nil {
		panic(err)
	}
	defer db.Close()

	err = db.Ping()
	if err != nil {
		panic(err)
	}

	fmt.Println("Successfully connected!")
}
