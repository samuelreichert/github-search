/* eslint-disable no-undef */
describe('GitHub Search home page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
    cy.get('.form-control.form-control-lg')
      .type('react', { delay: 100 })
  })

  it('Search for react', () => {
    cy.contains('GitHub Search')
      .should('be.visible')

    cy.get('.form-control.form-control-lg')
      .should('have.value', 'react')

    cy.url()
      .should('include', '?q=react')

    cy.contains('facebook/react')
      .should('be.visible')
  })

  it('Test pagination links', () => {
    cy.get('a.page-link')
      .contains('2')
      .click()

    cy.url()
      .should('include', '?q=react&page=2')

    cy.contains('Results in')
      .should('be.visible')

    cy.contains('facebook/react')
      .should('not.exist')

    cy.get('a.list-group-item')
      .should('have.length', 10)
  })

  it('Click in a repository', () => {
    cy.get('a.list-group-item')
      .first()
      .click()

    cy.url()
      .should('include', '/repository?name=facebook/react')

    cy.get('h1.full-name')
      .should('have.text', 'facebook/react')

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
