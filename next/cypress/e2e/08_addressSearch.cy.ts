describe('addressSearch', () => {
  it('should search address', () => {
    cy.visit(Cypress.env('baseUrl'))

    cy.get('button[aria-label="menu"]').eq(1).click()
    cy.get('h2').contains('地名から検索する')

    cy.get('input[name="addressSearch"]').type('池袋')

    cy.get('button[type="submit"]').click()

    cy.get('gmp-advanced-marker[aria-label="としま区民センター"]').should(
      'be.visible',
    )

    cy.contains('検索結果が見つかりませんでした').should('not.exist')
  })
})
