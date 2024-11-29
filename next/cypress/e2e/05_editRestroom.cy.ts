const fillEditRestroomModal = (newData: {
  name: string
  address: string
  content: string
}) => {
  cy.get('input[name="name"]').clear().type(newData.name)
  cy.get('input[name="address"]').clear().type(newData.address)
  cy.get('input[name="content"]').clear().type(newData.content)
}

describe('editRestroom', () => {
  it('should edit restroom', () => {
    const email = Cypress.env('email')
    const password = Cypress.env('password')

    const updatedData = {
      originalName: 'test name',
      updatedName: 'test name2',
      address: 'updated address',
      content: 'updated content',
    }

    signIn(email, password)
    cy.contains('ログイン中')

    cy.get(`gmp-advanced-marker[aria-label="${updatedData.originalName}"]`)
      .should('be.visible')
      .click({
        force: true,
      })

    cy.get('button').contains('編集する').click()

    fillEditRestroomModal(updatedData)

    cy.scrollTo('bottom')

    cy.get('button').contains('編集する').click()
    cy.get(
      `gmp-advanced-marker[aria-label="${updatedData.updatedName}"]`,
    ).should('be.visible')
  })
})
