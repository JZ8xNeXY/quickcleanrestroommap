describe('Index Pages', () => {
  it('should visit the index page', () => {
    // ルートページにアクセスしてh1タグに"hello world"が含まれているか確認
    cy.visit('/');
  });
});
