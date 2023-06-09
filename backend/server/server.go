package server

import (
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/logger"
)

type Server struct {
	Client *fiber.App
}

func NewServer() *Server {
	app := fiber.New()
	app.Use(logger.New())
	app.Use(cors.New())
	//app.Use(func(c *fiber.Ctx) error {
	//	time.Sleep(time.Second)
	//	c.Next()
	//	return nil
	//})

	return &Server{Client: app}
}
