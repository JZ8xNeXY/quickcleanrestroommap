describe('deleteRestroom', () => {
  it('should delete restroom', () => {
    const email = Cypress.env('email')
    const password = Cypress.env('password')

    const deleteRestroomData = {
      name: 'test name2',
    }

    signIn(email, password)
    cy.contains('ログイン中')

    cy.get(`gmp-advanced-marker[aria-label="${deleteRestroomData.name}"]`)
      .should('be.visible')
      .click({
        force: true,
      })

    cy.scrollTo('bottom')

    cy.get('button.MuiButtonBase-root').contains('編集する').click()

    cy.get('button.MuiButtonBase-root').contains('削除する').click()

    cy.get(
      `gmp-advanced-marker[aria-label="${deleteRestroomData.name}"]`,
    ).should('not.exist')
  })
})
