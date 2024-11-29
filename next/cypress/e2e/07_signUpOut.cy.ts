import { faker } from '@faker-js/faker'

const signUp = (email: string, password: string) => {
  cy.visit(`${Cypress.env('baseUrl')}/sign_up`)
  cy.get('input[name="email"]').type(email)
  cy.get('input[name="password"]').type(password)
  cy.get('input[name="confirmPassword"]').type(password)
  cy.get('button[type="submit"]').click()
}

const signOut = () => {
  cy.visit(`${Cypress.env('baseUrl')}/sign_out`)
}

describe('SignUp', () => {
  it('should sign up', () => {
    const email = faker.internet.email()
    const password = faker.internet.password()

    signUp(email, password)

    cy.contains('ログイン中')

    signOut()

    cy.contains('ログイン中').should('not.exist')
  })
})
