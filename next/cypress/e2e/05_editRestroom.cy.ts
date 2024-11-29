const signIn = (email: string, password: string) => {
  cy.visit(`${Cypress.env('baseUrl')}/sign_in`)
  cy.get('input[name="email"]').type(email)
  cy.get('input[name="password"]').type(password)
  cy.get('button[type="submit"]').click()
}
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
      name: 'test name2',
      address: 'updated address',
      content: 'updated content',
    }

    signIn(email, password)
    cy.contains('ログイン中')

    cy.get('gmp-advanced-marker[aria-label="test name"]')
      .should('be.visible')
      .click({
        force: true,
      })

    cy.get('button').contains('編集する').click()

    fillEditRestroomModal(updatedData)

    cy.scrollTo('bottom')

    cy.get('button').contains('編集する').click()
    cy.get(`gmp-advanced-marker[aria-label="${updatedData.name}"]`).should(
      'be.visible',
    )
  })
})
