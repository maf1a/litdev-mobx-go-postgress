package routes

import (
	"awesomeProject/repository"
	"fmt"
	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
)

type PostTask struct {
	AuthorName string          `json:"authorName" validate:"required,min=3,max=255"`
	Task       repository.Task `json:"task" validate:"required"`
}

func (r *Routes) CreateRoutesTask() {
	r.Server.Client.Get("/task", r.ListTasks)
	r.Server.Client.Patch("/task/:id/done", r.MarkTaskAsDone)
	r.Server.Client.Post("/task", r.CreateTask)
	r.Server.Client.Delete("/task/:id", r.DeleteTask)
}

func (r *Routes) ListTasks(c *fiber.Ctx) error {
	tasks, err := r.Service.ListTasks()
	if err != nil {
		return c.Status(400).SendString(err.Error())
	}

	c.JSON(tasks)
	return nil
}

func (r *Routes) CreateTask(c *fiber.Ctx) error {
	body := new(PostTask)
	if err := r.ValidatePayload(c, body); err != nil {
		return c.Status(400).SendString(err.Error())
	}

	taskResponse, err := r.Service.CreateTask(body.AuthorName, &body.Task)
	if err != nil {
		return c.Status(400).SendString(err.Error())
	}

	c.JSON(taskResponse)
	return nil
}

func (r *Routes) MarkTaskAsDone(c *fiber.Ctx) error {
	id, err := uuid.Parse(c.Params("id"))
	if err != nil {
		fmt.Println(err, c.Params("id"))
		return c.Status(400).SendString(err.Error())
	}

	err2 := r.Service.MarkTaskAsDone(id)
	if err2 != nil {
		return c.Status(400).SendString(err2.Error())
	}

	c.SendString("Status updated successfully")
	return nil
}

func (r *Routes) DeleteTask(c *fiber.Ctx) error {
	id, err := uuid.Parse(c.Params("id"))
	if err != nil {
		fmt.Println(err, c.Params("id"))
		return c.Status(400).SendString(err.Error())
	}

	err2 := r.Service.DeleteTask(id)
	if err2 != nil {
		return c.Status(400).SendString(err2.Error())
	}

	c.SendString("Task deleted successfully")
	return nil
}
