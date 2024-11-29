import { updatedData } from '../data/updatedRestroomData'

const signIn = (email: string, password: string) => {
  cy.visit(`${Cypress.env('baseUrl')}/sign_in`)
  cy.get('input[name="email"]').type(email)
  cy.get('input[name="password"]').type(password)
  cy.get('button[type="submit"]').click()
}

describe('deleteRestroom', () => {
  it('should delete restroom', () => {
    const email = Cypress.env('email')
    const password = Cypress.env('password')

    const deleteRestroomData = {
      name: updatedData.updatedName,
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
