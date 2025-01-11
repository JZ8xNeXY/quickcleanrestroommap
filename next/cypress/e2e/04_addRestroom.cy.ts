import { restroomData, RestroomDataInterface } from '../data/restroomData'

const signIn = (email: string, password: string) => {
  cy.visit(`${Cypress.env('baseUrl')}/sign_in`)
  cy.get('input[name="email"]').type(email)
  cy.get('input[name="password"]').type(password)
  cy.get('button[type="submit"]').click()
}

const openAddRestroomModal = () => {
  cy.get('[data-testid="AddLocationIcon"]').click()
  cy.get('h2').contains('トイレ情報を登録する')
}

const fillRestroomForm = (formData: RestroomDataInterface) => {
  cy.get('input[type="file"]').attachFile(formData.fileName, { force: true })
  cy.wait(10000)
  cy.get('input[name="name"]').type(formData.originalName)
  cy.get('input[name="address"]').type(formData.address)
  cy.get('input[name="content"]').type(formData.content)
  formData.facilities.forEach((facility) => {
    cy.get(`input[name="${facility}"]`).check()
  })
}

describe('AddRestroom', () => {
  it('should add restroom', () => {
    const email = Cypress.env('email')
    const password = Cypress.env('password')

    signIn(email, password)

    cy.wait(1000)

    openAddRestroomModal()

    fillRestroomForm(restroomData)

    cy.get('button[type="submit"]').click()

    cy.get(
      `gmp-advanced-marker[aria-label="${restroomData.originalName}"]`,
    ).should('be.visible')
  })
})
