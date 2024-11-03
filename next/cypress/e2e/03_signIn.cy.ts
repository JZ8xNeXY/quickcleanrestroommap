describe('SignIn', () => {
  it('should sign in', () => {
    cy.visit(Cypress.env('baseUrl') + '/sign_in')
    cy.get('input[name="email"]').type(Cypress.env('email'))
    cy.get('input[name="password"]').type(Cypress.env('password'))
    cy.get('button[type="submit"]').click()

    cy.contains('ログイン中')

    cy.visit(Cypress.env('baseUrl') + '/sign_out')
    cy.contains('ログイン中').should('not.exist')
  })
})
