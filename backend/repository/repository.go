package repository

import (
	"errors"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"reflect"
)

type Repository struct {
	DB     *gorm.DB
	Models struct {
		Author *Author
		Task   *Task
	}
}

func NewRepository() (*Repository, error) {
	dsn := "host=localhost user=user password=admin dbname=golang_test port=54320 sslmode=disable TimeZone=Europe/Zurich"
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		return nil, errors.New("Could not connect to the database:" + err.Error())
	}

	repo := &Repository{DB: db}

	models := reflect.ValueOf(repo.Models)
	for i := 0; i < models.NumField(); i++ {
		model := models.Field(i).Interface()
		err := db.AutoMigrate(model)
		if err != nil {
			return nil, errors.New("Could not run migrations:" + err.Error())
		}
	}

	return repo, nil
}
