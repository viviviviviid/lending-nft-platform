package main

import (
	"fmt"

	"github.com/m/go/db"
	"github.com/m/go/rest"
)

func main() {
	fmt.Println("Start")
	db.InitDB()
	rest.Start()
} 
   