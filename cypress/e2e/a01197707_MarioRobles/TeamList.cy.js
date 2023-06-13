import { clear } from "console";



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

  it('Prueba 4 - Componente se muestra correctamente para administrador', () => {
    cy.log('Inicia prueba 4 - Componente se muestra correctamente para administrador');

    loginViaAuth0Ui(adminUsername, adminPassword);

    cy.get('.container').contains('Teams').should('exist');
    cy.get('.container').contains('Team Name').should('exist');
    cy.get('[data-testid="team-list-status-25-true"]').should('exist');
    cy.get('[data-testid="edit-team-information-25"]').should('exist');

    cy.log('Prueba 4 terminada');
  })

  it('Prueba 5 - Componente se muestra correctamente para empleados', () => {
    cy.log('Inicia prueba 5 - Componente se muestra correctamente para empleados');

    loginViaAuth0Ui(employeeUsername, employeePassword);

    cy.get('.container').contains('Teams').should('exist');
    cy.get('.container').contains('Team Name').should('exist');
    cy.get('[data-testid="team-list-status-25-true"]').should('not.exist');
    cy.get('[data-testid="edit-team-information-25"]').should('not.exist');

    cy.log('Prueba 5 terminada');
  })

  it('Prueba 6 - Se cambia de nombre el equipo', () => {
    let testUser = 'CY Test Team 1';
    let newTestUser = 'CY Test Team 111';
    cy.log('Inicia prueba 6 - Componente se muestra correctamente para administrador');

    loginViaAuth0Ui(adminUsername, adminPassword);

    cy.contains(testUser).get('[data-testid="edit-team-information-25"]').click();
    cy.get('input#newTeamName').clear().type(newTestUser);
    cy.get('button#update-button').click();
    cy.contains(newTestUser).should('exist');

    cy.contains(newTestUser).get('[data-testid="edit-team-information-25"]').click();
    cy.get('input#newTeamName').clear().type(testUser);
    cy.get('button#update-button').click();
    cy.contains(testUser).should('exist');
    //cy.get('[class="sc-dcrmVg cVezWz rdt_TableRow"]').contains(newTestUser).get('[data-testid="reactivate-full-team--25"]').should('exist');
    //cy.get('.container').contains('Team Name').should('exist');
    //cy.get('[data-testid="team-list-status"]').should('exist');
    
    cy.log('Prueba 6 terminada');
  })

  it('Prueba 7 - Se borra el equipo', () => {
    let testUser = 'CY Test Team 1';
    cy.log('Inicia prueba 7 - Se borra el equipo');

    loginViaAuth0Ui(adminUsername, adminPassword);

    cy.get('[data-testid="erase-full-team-25"]').should('exist');
    cy.get('[data-testid="team-list-status-25-true"]').should('exist');
    cy.get('[data-testid="erase-full-team-25"]').click();
    cy.get('[data-testid="reactivate-full-team-25"]').should('exist');
    cy.get('[data-testid="team-list-status-25-false"]').should('exist');
    cy.get('[data-testid="reactivate-full-team-25"]').click();
    cy.get('[data-testid="erase-full-team-25"]').should('exist');
    cy.get('[data-testid="team-list-status-25-true"]').should('exist');
    
    cy.log('Prueba 7 terminada');
  })

  /*it('Prueba 2 - collapse renders correctly', () => {
    cy.get('div#cell-3-undefined').contains('row-0').should('exist');
    //cy.request('GET', '/api/get-teams').then((response) => {expect(response.status).to.eq(201);});
  })*/
})