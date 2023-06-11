


describe('TeamList Component', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
    let username = 'adminadmin@tec.mx';
    let password = 'adminadmin';

    cy.origin(
      'https://dev-xo3qm08sbje0ntri.us.auth0.com',
      { args: { username, password } },
      ({ username, password }) => {
        cy.get('input#username').type(username)
        cy.get('input#password').type(password, { log: true })
        cy.get('button[data-action-button-primary=true]').contains('Continue').click()
      }
    )
    // Ensure Auth0 has redirected us back to the RWA.
    cy.url().should('equal', 'http://localhost:3000/generar-perfil')
    cy.visit('http://localhost:3000/teams')
  });

  it('Prueba 1 - component renders correctly', () => {
    cy.get('.container').contains('Teams').should('exist');
    cy.get('.container').contains('Team Name').should('exist');
    //cy.request('GET', '/api/get-teams').then((response) => {expect(response.status).to.eq(201);});
  })

  it('Prueba 2 - collapse renders correctly', () => {
    cy.get('div#cell-3-undefined').contains('row-0').should('exist');
    //cy.request('GET', '/api/get-teams').then((response) => {expect(response.status).to.eq(201);});
  })
})

/*
describe('template spec', () => {
    it('passes', () => {
      cy.visit('http://localhost:3000/')
      cy.contains('AC').click()
      cy.contains('1').click()
      cy.contains('0').click()
      cy.contains('%').click()
      cy.contains('x').click()
      cy.contains('6').click()
      cy.contains('0').click()
      cy.contains('=').click()
      cy.get('.component-display').first().should('have.text', '6')
    })
  })
*/