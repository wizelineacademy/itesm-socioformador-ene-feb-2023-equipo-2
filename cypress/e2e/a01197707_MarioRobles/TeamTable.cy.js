



describe('TeamList Component', () => {
  function loginViaAuth0Ui(username, password) {
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
  }

  let adminUsername = 'adminadmin@tec.mx';
  let adminPassword = 'adminadmin';
  let employeeUsername = 'mario.cypress@test.mx';
  let employeePassword = 'wizeline000';

  it('Prueba 12 - Componente se muestra correctamente para administrador', () => {
    cy.log('Inicia prueba 12 - Componente se muestra correctamente para administrador');

    loginViaAuth0Ui(adminUsername, adminPassword);

    cy.get('.container').contains('Members').should('exist');
    cy.get('.container').contains('Member Name').should('exist');
    cy.get('[data-testid="member-in-team-status-5-20124"]').should('exist');
    cy.get('[data-testid="erase-member-in-team-5-20124"]').should('exist');

    cy.log('Prueba 12 terminada');
  })

  it('Prueba 13 - Componente se muestra correctamente para empleados', () => {
    cy.log('Inicia prueba 13 - Componente se muestra correctamente para empleados');

    loginViaAuth0Ui(employeeUsername, employeePassword);

    cy.get('.container').contains('Members').should('exist');
    cy.get('.container').contains('Member Name').should('exist');
    cy.get('[data-testid="member-in-team-status-5-20124"]').should('not.exist');
    cy.get('[data-testid="erase-member-in-team-5-20124"]').should('not.exist');

    cy.log('Prueba 13 terminada');
  })

  it('Prueba 14 - Se borra el miembro del equipo', () => {
    let testUsername = 'Employee 10';
    cy.log('Inicia prueba 14 - Se borra el miembro del equipo');

    loginViaAuth0Ui(adminUsername, adminPassword);

    cy.contains(testUsername).get('[data-testid="erase-member-in-team-5-20124"]').click();
    cy.get('[data-testid="reactivate-member-in-team-5-20124"]').should('exist');

    cy.contains(testUsername).get('[data-testid="reactivate-member-in-team-5-20124"]').click();
    cy.get('[data-testid="erase-member-in-team-5-20124"]').should('exist');
    
    cy.log('Prueba 14 terminada');
  })

  it('Prueba 15 - Checar que se filtren los usuarios', () => {
    let testUser = 'CY Test Team 1';
    cy.log('Inicia prueba 15 - Checar que se filtren los usuarios');

    loginViaAuth0Ui(adminUsername, adminPassword);

    cy.get('#team-names-select').type('CY Test Team 4444{enter}');

    cy.get('[data-testid="erase-member-in-team-43-96292"]').should('exist');
    cy.contains('1-1 of 1').should('have.length', 1);
    
    cy.log('Prueba 15 terminada');
  })
})