describe('Index Pages', () => {
  it('should visit index page correctly', () => {
    cy.visit(Cypress.env('baseUrl'))
    cy.get('gmp-advanced-marker[aria-label="Your Location"]').should(
      'be.visible',
    )
    cy.get('gmp-advanced-marker[aria-label="新丸の内ビル地下2階"]').should(
      'be.visible',
    )
    cy.contains('Copyright © Quick Clean Restroom Map All rights reserved.')
  })

  it('should vist about page correctly', () => {
    cy.visit(Cypress.env('baseUrl') + '/about')
    cy.get('h3').contains('Quick Clean Restroom Map')
    cy.get('h3').contains('きれいなトイレを見つけよう')
    cy.scrollTo('bottom')
    cy.get('gmp-advanced-marker[aria-label="Your Location"]').should(
      'be.visible',
    )
    cy.get('gmp-advanced-marker[aria-label="新丸の内ビル地下2階"]').should(
      'be.visible',
    )
    cy.contains('Copyright © Quick Clean Restroom Map All rights reserved.')
  })

  it('Should visit termofuse correctly', () => {
    cy.visit(Cypress.env('baseUrl') + '/termsofuse')
    cy.get('h1').contains('サービス利用規約')
  })

  it('Should visit privacypolicy correctly', () => {
    cy.visit(Cypress.env('baseUrl') + '/privacypolicy')
    cy.get('h1').contains('プライバシーポリシー')
  })
})
