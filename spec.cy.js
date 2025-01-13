describe('template spec', () => {
  it('passes', () => {

    Cypress.on('uncaught:exception',()=>{
      return false
    })
    cy.visit('https://example.cypress.io')
  })
})