


describe('TeamSearch Component', () => {
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

    cy.url().should('equal', 'http://localhost:3000/generar-perfil')
    cy.visit('http://localhost:3000/teams')
  });

  it('Prueba 1 - Lista de teams se carga correctamente', () => {
    cy.log('Inicia prueba 1 - Lista de teams se carga correctamente');

    cy.request('GET', '/api/get-teams').then((response) => {expect(response.status).to.eq(201);});
    cy.get('#team-names-select').should('exist').log('Teams select cargó');

    cy.log('Prueba 1 terminada');
  })

  it('Prueba 2 - Lista de members se carga correctamente', () => {
    cy.log('Inicia prueba 2 - Lista de members se carga correctamente');

    cy.request('GET', '/api/get-employees').then((response) => {expect(response.status).to.eq(200);});
    cy.get('#members-names-select').should('exist').log('Members select cargó');

    cy.log('Prueba 2 terminada');
  })

  it('Prueba 3 - Componente teamCreation aparece', () => {
    cy.log('Inicia prueba 3 - Componente teamCreation aparece');

    cy.get('button#team-creation-button').click();
    cy.get('.container').contains('Close').should('exist').log('TeamCreation apareció');
    cy.get('button#team-creation-button').click();
    cy.get('.container').contains('Add Team').should('exist').log('TeamCreation desapareció');

    cy.log('Prueba 3 terminada');
  })
})