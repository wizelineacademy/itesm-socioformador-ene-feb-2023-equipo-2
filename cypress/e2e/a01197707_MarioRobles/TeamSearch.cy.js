


describe('TeamSearch Component', () => {
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

  it('Prueba 4 - ', () => {
    let testEmployeeUser = 'mario.cypress@test.mx';
    let testEmployeePassword = 'wizeline000';
    cy.log('Inicia prueba 4 - ');

    cy.log('Prueba 4 terminada');
  })

  it('Prueba 1 - Lista de teams se carga correctamente', () => {
    cy.log('Inicia prueba 1 - Lista de teams se carga correctamente');

    loginViaAuth0Ui(adminUsername, adminPassword);

    cy.request('GET', '/api/get-teams').then((response) => {expect(response.status).to.eq(201);});
    cy.get('#team-names-select').should('exist').log('Teams select cargó');

    cy.log('Prueba 1 terminada');
  })

  it('Prueba 2 - Lista de members se carga correctamente', () => {
    cy.log('Inicia prueba 2 - Lista de members se carga correctamente');

    loginViaAuth0Ui(adminUsername, adminPassword);

    cy.request('GET', '/api/get-employees').then((response) => {expect(response.status).to.eq(200);});
    cy.get('#members-names-select').should('exist').log('Members select cargó');

    cy.log('Prueba 2 terminada');
  })

  it('Prueba 3 - Componente teamCreation aparece', () => {
    cy.log('Inicia prueba 3 - Componente teamCreation aparece');

    loginViaAuth0Ui(adminUsername, adminPassword);

    cy.get('button#team-creation-button').click();
    cy.get('.container').contains('Close').should('exist').log('TeamCreation apareció');
    cy.get('button#team-creation-button').click();
    cy.get('.container').contains('Add Team').should('exist').log('TeamCreation desapareció');

    cy.log('Prueba 3 terminada');
  })
})