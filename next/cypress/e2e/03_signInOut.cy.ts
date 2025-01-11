const signIn = (email: string, password: string) => {
  cy.visit(`${Cypress.env('baseUrl')}/sign_in`)
  cy.get('input[name="email"]').type(email)
  cy.get('input[name="password"]').type(password)
  cy.get('button[type="submit"]').click()
}

const signOut = () => {
  cy.visit(`${Cypress.env('baseUrl')}/sign_out`)
}

describe('SignIn', () => {
  it('should sign in and sign out', () => {
    const email = Cypress.env('email')
    const password = Cypress.env('password')

    signIn(email, password)
    cy.get('[data-testid="LoginIcon"]').should('not.exist')

    signOut()
    cy.get('[data-testid="LoginIcon"]').should('be.visible')
  })
  it('should not log in with invalid credentials', () => {
    const email = Cypress.env('email')
    const invalidPassword = 'wrong_password'

    cy.visit(`${Cypress.env('baseUrl')}/sign_in`)
    cy.get('input[name="email"]').type(email)
    cy.get('input[name="password"]').type(invalidPassword)
    cy.get('button[type="submit"]').click()

    //ページが遷移しない
    cy.contains('Sign in').should('be.visible')
  })
})
