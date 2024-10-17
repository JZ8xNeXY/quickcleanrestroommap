describe('Index Pages', () => {
  it('should visit the index page', () => {
    cy.visit(Cypress.env('baseUrl'))
    // 現在地アイコン
    cy.get('gmp-advanced-marker[aria-label="Your Location"]').should(
      'be.visible',
    )
    //代表的なアイコン
    cy.get('gmp-advanced-marker[aria-label="新丸の内ビル地下2階"]').should(
      'be.visible',
    )
    cy.contains('Copyright © Quick Clean Restroom Map All rights reserved.')

    cy.visit(Cypress.env('baseUrl') + '/about')
    cy.get('h3').contains('Quick Clean Restroom Map')
    cy.get('h3').contains('きれいなトイレを見つけよう')
    cy.scrollTo('bottom')
    // 現在地アイコン

    cy.get('gmp-advanced-marker[aria-label="Your Location"]').should(
      'be.visible',
    )
    //代表的なアイコン
    cy.get('gmp-advanced-marker[aria-label="新丸の内ビル地下2階"]').should(
      'be.visible',
    )
    cy.contains('Copyright © Quick Clean Restroom Map All rights reserved.')

    cy.visit(Cypress.env('baseUrl') + '/termsofuse')
    cy.get('h1').contains('サービス利用規約')

    cy.visit(Cypress.env('baseUrl') + '/privacypolicy')
    cy.get('h1').contains('プライバシーポリシー')
  })
})
