import {
  updatedData,
  updatedRestroomDataInterface,
} from '../data/updatedRestroomData'

const signIn = (email: string, password: string) => {
  cy.visit(`${Cypress.env('baseUrl')}/sign_in`)
  cy.get('input[name="email"]').type(email)
  cy.get('input[name="password"]').type(password)
  cy.get('button[type="submit"]').click()
}
const fillEditRestroomModal = (newData: updatedRestroomDataInterface) => {
  cy.get('input[name="name"]')
    .should('be.visible')
    .wait(500)
    .clear()
    .type(newData.updatedName)
  cy.get('input[name="address"]').clear().type(newData.updatedAddress)
  cy.get('input[name="content"]').clear().type(newData.updatedContent)
}

describe('editRestroom', () => {
  it('should edit restroom', () => {
    const email = Cypress.env('email')
    const password = Cypress.env('password')

    signIn(email, password)

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
