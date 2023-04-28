package api_service

import (
	"awesomeProject/repository"
	"errors"
	"github.com/google/uuid"
	"time"
)

func (s *ApiService) ListTasks() ([]*repository.TaskResponse, error) {
	var tasks []repository.Task

	result := s.Repo.DB.Preload("Author").Find(&tasks)
	if result.Error != nil {
		return nil, result.Error
	}

	tasksResponse := make([]*repository.TaskResponse, len(tasks))
	for i, v := range tasks {
		tasksResponse[i] = v.CreateResponse()
	}

	return tasksResponse, nil
}

func (s *ApiService) CreateTask(authorName string, task *repository.Task) (*repository.TaskResponse, error) {
	var author *repository.Author
	resultAuthor := s.Repo.DB.FirstOrCreate(&author, &repository.Author{Name: authorName})
	if resultAuthor.Error != nil {
		return nil, resultAuthor.Error
	}

	task.AuthorID = author.ID
	result := s.Repo.DB.Create(task)
	if result.Error != nil {
		return nil, result.Error
	}

	task.Author = author
	return task.CreateResponse(), nil
}

func (s *ApiService) MarkTaskAsDone(id uuid.UUID) error {
	task := &repository.Task{ID: id}
	result := s.Repo.DB.Model(task).Updates(&repository.Task{IsDone: true, UpdatedAt: time.Now()})
	if result.Error != nil {
		return result.Error
	}

	if result.RowsAffected == 0 {
		return errors.New("could not mark task as done")
	}

	return nil
}

func (s *ApiService) DeleteTask(id uuid.UUID) error {
	task := &repository.Task{ID: id}
	result := s.Repo.DB.Model(task).Delete(task)
	if result.Error != nil {
		return result.Error
	}

	if result.RowsAffected == 0 {
		return errors.New("could not delete task")
	}

	return nil
}
