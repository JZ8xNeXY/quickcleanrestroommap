describe('CalculateAndDisplayRoute', () => {
  it('should display calculate and display route', () => {
    cy.visit(Cypress.env('baseUrl'))
    cy.wait(2000) // 2秒待つ
    cy.get('gmp-advanced-marker[aria-label="新丸の内ビル地下2階"]').click({
      force: true,
    })

    cy.contains('新丸の内ビル地下2階')
    cy.get('h6').contains('住所')
    cy.get('p').contains('東京都千代田区')
    cy.get('h6').contains('コメント')
    cy.get('p').contains('とても空いていてキレイ')
    cy.get('h6').contains('設備情報')
    cy.get('p').contains('ー')
    cy.get('h6').contains('清潔度')
    for (let i = 1; i <= 5; i++) {
      cy.get(`.star.star-${i}`).should('exist') // 各クラス名を動的に指定し、存在確認
    }

    cy.contains('お問い合わせはこちら ＞')

    cy.get('button[data-testid="closeButton"]')
      .scrollIntoView()
      .click({ force: true })

    // //始点のポイント
    // cy.get('#gmimap0').should('exist')
    // //終点のポイントの確認
    // cy.get('#gmimap1').should('exist')

    // cy.get('button.gm-ui-hover-effect').should('exist')
    // cy.contains('トイレまで歩いて約')
    // cy.contains('3 mins')

    cy.contains('GoogleMapで案内する >')
  })
})
