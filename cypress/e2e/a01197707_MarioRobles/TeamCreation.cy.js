


describe('TeamSearch Component', () => {
  beforeEach(() => {
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
  });

  it('Prueba 1 - Crear team', () => {
    cy.log('Inicia prueba 1 - Employees list se carga correctamente');

    cy.intercept('GET', '/api/get-employees', (req) => {
      req.reply((res) => {
        res.send({ status: 200 });
      });
    }).as('getAllEmployees');

    
    cy.contains('Loading...').should('not.exist');

    cy.log('Prueba 1 terminada');
  })

  it('Prueba 2 - Crear team sin datos', () => {
    cy.log('Inicia prueba 2 - Crear team sin datos');

    cy.get('button#create-team-button').click()
    cy.contains('Please fill in all fields').should('exist');

    cy.log('Prueba 2 terminada');
  })

  it('Prueba 3 - Crear team', () => {
    let testName = 'CY Test Team 2';
    let testMember = 'testWize1';
    cy.log('Inicia prueba 3 - Crear team');

    cy.get('input#new-team-name').type(testName);
    cy.get('#new-team-members').type(testMember);
    cy.get('button#create-team-button').contains('Add').click();

    cy.intercept('POST', '/api/createTeam', (req) => {
      req.reply((res) => {
        res.send({ status: 201 });
      });
    }).as('createATeam');

    cy.contains('Please fill out the following fields to create a team:').should('not.be.visible').log('Team fue creado');

    cy.log('Prueba 3 terminada');
  })
})