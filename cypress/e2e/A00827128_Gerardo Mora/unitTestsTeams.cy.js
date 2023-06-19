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
  
    it('Prueba 14 - Obtener teams', () => {
      cy.log('Prueba 14: Carga correctamente teams');
  
      cy.intercept('GET', '/api/get-teams', (req) => {
        req.reply((res) => {
          res.send({ status: 200 });
        });
      }).as('getTeams');
  
      cy.contains('Loading...').should('not.exist');
      cy.log('Fin de prueba 14');
    })
  
    it('Prueba 15 - Crear team correctamente', () => {
      let testName = 'Top Wizeline';
      let testMembers = 'Juan Rulfo'
      cy.log('Prueba 3: Crear cliente correctamente');
  
      cy.get('input#new-team-name').type(testName);
      cy.get('#new-team-members').type(testMembers);
      cy.get('button#create-team-button').contains('Add').click();
  
      cy.intercept('POST', '/api/createTeam', (req) => {
        req.reply((res) => {
          res.send({ status: 201 });
        });
      }).as('createTeam');
  
      cy.contains('Please fill out the following fields to create a team:').should('not.be.visible').log('Equipo creado correctamente');
  
      cy.log('Fin de prueba 15');
    })
  })