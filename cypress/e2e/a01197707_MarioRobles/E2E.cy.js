



describe('TeamList Component', () => {
  it('Prueba End-to-End - Crear y editar un equipo', () => {

    let username = 'adminadmin@tec.mx';
    let password = 'adminadmin';

    cy.visit('http://localhost:3000')
    cy.origin(
      'https://dev-xo3qm08sbje0ntri.us.auth0.com',
      { args: { username, password } },
      ({ username, password }) => {
        cy.get('input#username').type(username)
        cy.get('input#password').type(password, { log: true })
        cy.get('button[data-action-button-primary=true]').contains('Continue').click()
      }
    )
    cy.url().should('equal', 'http://localhost:3000/generar-perfil')
    cy.visit('http://localhost:3000/teams')

    cy.get('button#team-creation-button').click();
  
    cy.get('input#new-team-name').type('CY Test Team 5');
    cy.get('#new-team-members').type('Mario Cypress {enter}');
    cy.get('button#create-team-button').contains('Add').click();

    cy.reload();

    cy.get('#team-names-select').type('CY Test Team 5{enter}');
    cy.get('[data-testid="edit-team-information-54"]').click();
    cy.get('[data-testid="edit-team-information-54"]').should('exist');

    cy.get('#team-names-select').type('CY Test Team 4{enter}');
    cy.get('[data-testid="edit-team-information-52"]').click();
    cy.get('input#newTeamName').clear().type('CY Test Team 4444');
    cy.get('button#update-button').click();
    cy.get('#team-names-select').type('CY Test Team 4444{enter}');
    cy.contains('CY Test Team 4444').should('exist');
    cy.get('[data-testid="edit-team-information-52"]').should('exist');
  })
})