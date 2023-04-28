package api_service

import "awesomeProject/repository"

type ApiService struct {
	Repo *repository.Repository
}

func NewApiService(repo *repository.Repository) *ApiService {
	return &ApiService{Repo: repo}
}
