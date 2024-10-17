describe('deleteRestroom', () => {
  it('should delete restroom', () => {
    cy.visit(Cypress.env('baseUrl') + '/sign_in')

    cy.get('input[name="email"]').type(Cypress.env('email'))
    cy.get('input[name="password"]').type(Cypress.env('password'))
    cy.get('button[type="submit"]').click()

    cy.contains('管理者権限でログイン中')

    cy.wait(2000)
    cy.get('gmp-advanced-marker[aria-label="test name2"]')
      .should('be.visible')
      .click({
        force: true,
      })

    cy.wait(1000)

    cy.get('button.MuiButtonBase-root').contains('編集する').click()

    cy.wait(1000)

    cy.scrollTo('bottom')

    cy.get('button.MuiButtonBase-root').contains('削除する').click()

    cy.get('gmp-advanced-marker[aria-label="test name2"]').should('not.exist')
  })
})
