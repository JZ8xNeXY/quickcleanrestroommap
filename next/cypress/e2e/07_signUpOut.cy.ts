import { faker } from '@faker-js/faker'

describe('SignUp', () => {
  it('should sign up', () => {
    const email = faker.internet.email()
    const password = faker.internet.password()

    cy.visit(Cypress.env('baseUrl') + '/sign_up')
    cy.get('input[name="email"]').type(email)
    cy.get('input[name="password"]').type(password)
    cy.get('input[name="confirmPassword"]').type(password)
    cy.get('button[type="submit"]').click()

    cy.wait(1000)

    cy.contains('ログイン中')

    cy.visit(Cypress.env('baseUrl') + '/sign_out')
    cy.contains('ログイン中').should('not.exist')
  })
})
