describe('CalculateAndDisplayRoute', () => {
  it('should display calculate and display route', () => {
    cy.visit(Cypress.env('baseUrl'))
    cy.get('gmp-advanced-marker[aria-label="新丸の内ビル地下2階"]').click({
      force: true,
    })

    const restroomDetails = {
      name: '新丸の内ビル地下2階',
      addressHeader: '住所',
      address: '東京都千代田区',
      commentHeader: 'コメント',
      comment: 'とても空いていてキレイ',
      facilitiesHeader: '設備情報',
      facilities: 'ー',
      cleanlinessHeader: '清潔度',
    }

    cy.contains(restroomDetails.name)
    cy.get('h6').contains(restroomDetails.addressHeader)
    cy.get('p').contains(restroomDetails.address)
    cy.get('h6').contains(restroomDetails.commentHeader)
    cy.get('p').contains(restroomDetails.comment)
    cy.get('h6').contains(restroomDetails.facilitiesHeader)
    cy.get('p').contains(restroomDetails.facilities)
    cy.get('h6').contains(restroomDetails.cleanlinessHeader)

    for (let i = 1; i <= 5; i++) {
      cy.get(`.star.star-${i}`).should('exist') // 各クラス名を動的に指定し、存在確認
    }

    cy.contains('お問い合わせはこちら ＞')

    cy.get('button[data-testid="closeButton"]')
      .scrollIntoView()
      .click({ force: true })

    //始点のポイント
    cy.get('#gmimap0').should('exist')
    //終点のポイントの確認
    cy.get('#gmimap1').should('exist')

    cy.get('button.gm-ui-hover-effect').should('exist')
    cy.contains('トイレまで歩いて約')
    cy.contains('3 mins')

    cy.contains('GoogleMapで案内する >')
  })
})
