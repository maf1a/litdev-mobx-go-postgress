package repository

import (
	"github.com/google/uuid"
	"gorm.io/gorm"
)

type Author struct {
	ID    uuid.UUID `gorm:"type:uuid;primary_key;"`
	Name  string    `gorm:"size:255;not null"`
	Tasks []Task    `gorm:"constraint:OnUpdate:CASCADE,OnDelete:SET NULL;"`
}

func (a *Author) BeforeCreate(tx *gorm.DB) (err error) {
	a.ID = uuid.New()
	return
}
