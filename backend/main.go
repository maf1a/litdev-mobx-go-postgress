package main

import (
	"awesomeProject/api_service"
	repository "awesomeProject/repository"
	"awesomeProject/routes"
	server2 "awesomeProject/server"
	"fmt"
	"log"
)

func main() {
	repo, err := repository.NewRepository()
	if err != nil {
		fmt.Println("Could not create a repository:", err.Error())
		return
	}

	apiService := api_service.NewApiService(repo)
	server := server2.NewServer()
	routes.NewRoutes(server, apiService)
	log.Fatal(server.Client.Listen(":3000"))
}
