const openAddRestroomModal = () => {
  cy.get('button[aria-label="menu"]').eq(1).click()
  cy.get('h2').contains('トイレ情報を登録する')
}

const fillRestroomForm = (formData: {
  fileName: string
  name: string
  address: string
  content: string
  facilities: string[]
}) => {
  cy.get('input[type="file"]').attachFile(formData.fileName, { force: true })
  cy.wait(1000)
  cy.get('input[name="name"]').type(formData.name)
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

    const restroomData = {
      fileName: 'test.jpeg',
      name: 'test name',
      address: 'test address',
      content: 'test content',
      facilities: [
        'nursing_room',
        'anyone_toilet',
        'diaper_changing_station',
        'powder_corner',
        'stroller_accessible',
      ],
    }

    signIn(email, password)
    cy.contains('ログイン中')

    openAddRestroomModal()

    fillRestroomForm(restroomData)

    cy.get('button[type="submit"]').click()

    cy.contains('ログイン中')

    cy.get(`gmp-advanced-marker[aria-label="${restroomData.name}"]`).should(
      'be.visible',
    )
  })
})
