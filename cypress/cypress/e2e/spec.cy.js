const { faker } = require("@faker-js/faker")

describe('Website loads', () => {
  beforeEach(() => cy.visit("/"))

  it('gets to the website', () => {
    cy.get("h2").contains("Create new task")
  })

  it('Creates a task', () => {
    cy.get("#input-author-name").type(faker.internet.userName())
    cy.get("#input-task-name").type(faker.commerce.productMaterial(), {force: true})
    cy.get("button[name='create-task']").click()
  })
})

