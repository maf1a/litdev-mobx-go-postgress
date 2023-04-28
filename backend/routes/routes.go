package routes

import (
	"awesomeProject/api_service"
	"awesomeProject/server"
	"github.com/go-playground/validator/v10"
	"github.com/gofiber/fiber/v2"
)

type Routes struct {
	Server    *server.Server
	Service   *api_service.ApiService
	Validator *validator.Validate
}

func (r *Routes) ValidatePayload(c *fiber.Ctx, target interface{}) error {
	payload := target
	if err := c.BodyParser(payload); err != nil {
		return err
	}

	if err := r.Validator.Struct(payload); err != nil {
		return err
	}

	return nil
}

func NewRoutes(server *server.Server, service *api_service.ApiService) {
	validatorInstance := validator.New()
	routes := &Routes{
		Server:    server,
		Service:   service,
		Validator: validatorInstance,
	}

	routes.CreateRoutesTask()
}
