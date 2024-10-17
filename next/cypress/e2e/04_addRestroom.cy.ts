describe('AddRestroom', () => {
  it('should add restroom', () => {
    cy.visit(Cypress.env('baseUrl'))

    //モーダル表示
    cy.get('button[aria-label="menu"]').eq(1).click()

    cy.get('h2').contains('トイレ情報を登録する')

    //トイレを登録
    cy.get('input[type="file"]').attachFile('test.jpeg', { force: true })
    cy.wait(1000)

    cy.get('input[name="name"]').type('test name')
    cy.get('input[name="address"]').type('test address')
    cy.get('input[name="content"]').type('test content')

    cy.get('p').contains('設備有無')

    cy.get('input[name="nursing_room"]').check()
    cy.get('input[name="anyone_toilet"]').check()
    cy.get('input[name="diaper_changing_station"]').check()
    cy.get('input[name="powder_corner"]').check()
    cy.get('input[name="stroller_accessible"]').check()

    cy.wait(3000)

    cy.get('button[type="submit"]').click()

    //トイレの登録の確認
    cy.get('gmp-advanced-marker[aria-label="test name"]').should('be.visible')
  })
})
