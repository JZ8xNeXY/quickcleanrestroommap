describe('SignIn', () => {
  it('should sign in', () => {
    cy.visit(Cypress.env('baseUrl') + '/sign_in')
    cy.get('input[name="email"]').type(Cypress.env('email'))
    cy.get('input[name="password"]').type(Cypress.env('password'))
    cy.get('button[type="submit"]').click()

    cy.contains('管理者権限でログイン中')

    cy.visit(Cypress.env('baseUrl') + '/sign_out')
    cy.contains('管理者権限でログイン中').should('not.exist')
  })
})
