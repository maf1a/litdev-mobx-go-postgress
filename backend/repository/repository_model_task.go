package repository

import (
	"github.com/google/uuid"
	"gorm.io/gorm"
	"time"
)

type Task struct {
	ID        uuid.UUID `gorm:"type:uuid;primary_key;"`
	Name      string    `validate:"required,min=3,max=255" gorm:"size:255;not null"`
	IsDone    bool      `gorm:"type:boolean;not null"`
	AuthorID  uuid.UUID `gorm:"type:uuid;not null"`
	CreatedAt time.Time
	UpdatedAt time.Time
	Author    *Author
}

type TaskResponse struct {
	ID         uuid.UUID `json:"id"`
	Name       string    `json:"name"`
	IsDone     bool      `json:"isDone"`
	AuthorName string    `json:"author"`
	UpdatedAt  int64     `json:"updatedAt"`
}

func (t *Task) BeforeCreate(tx *gorm.DB) (err error) {
	t.ID = uuid.New()
	return
}

func (t *Task) CreateResponse() *TaskResponse {
	return &TaskResponse{
		ID:         t.ID,
		Name:       t.Name,
		IsDone:     t.IsDone,
		UpdatedAt:  t.UpdatedAt.Unix(),
		AuthorName: t.Author.Name,
	}
}
