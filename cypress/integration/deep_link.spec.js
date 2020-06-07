/* eslint-disable no-undef */
describe('GitHub Search deep links', () => {
  it('home page link with search results', () => {
    cy.visit('http://localhost:3000/?q=react&page=1')

    cy.contains('GitHub Search')
      .should('be.visible')

    cy.get('h5')
      .first()
      .should('have.text', 'facebook/react')

    cy.contains('Results in')
      .should('be.visible')

    cy.get('a.list-group-item')
      .should('have.length', 10)

    cy.get('ul.pagination')
      .should('be.visible')

    cy.get('li.active')
      .should('have.text', '1')
  })

  it('repository page link to facebook/react', () => {
    cy.visit('http://localhost:3000/repository?name=facebook/react')

    cy.contains('facebook/react')
      .should('be.visible')

    cy.get('span.hover-badge')
      .should('have.length', 5)

    cy.get('img.rounded')
      .should('be.visible')

    cy.get('h5.languages')
      .should('be.visible')

    cy.contains('Readme')
      .should('be.visible')
  })
})
