describe('ClientSearch Component', () => {
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
      cy.visit('http://localhost:3000/clients')
      cy.get('button#client-creation-button').click();
    });
  
    it('Prueba 1 - Obtener clientes', () => {
      cy.log('Prueba 1: Carga correctamente clients');
  
      cy.intercept('GET', '/api/get-clients', (req) => {
        req.reply((res) => {
          res.send({ status: 200 });
        });
      }).as('getAllClients');
  
      cy.contains('Loading...').should('not.exist');
      cy.log('Fin de prueba 1');
    })
  
    it('Prueba 2 - Crear cliente vacío', () => {
      cy.log('Prueba 2: Carga correctamente clients');
  
      cy.get('button#create-client-button').click()
      cy.contains('Please fill in all fields').should('exist');
  
      cy.log('Fin de prueba 2');
    })
  
    it('Prueba 3 - Crear cliente correctamente', () => {
      let testName = 'Bismarck Lepe';
      let testEmail = 'blepe@admin.mx';
      let testPhone = '123456789'
      cy.log('Prueba 3: Crear cliente correctamente');
  
      cy.get('input#name').type(testName);
      cy.get('input#email').type(testEmail);
      cy.get('input#phone').type(testPhone);
      cy.get('button#create-client-button').contains('Add').click();
  
      cy.intercept('POST', '/api/create-client', (req) => {
        req.reply((res) => {
          res.send({ status: 201 });
        });
      }).as('createClient');
  
      cy.contains('Please fill out the following fields to create a client:').should('not.be.visible').log('Cliente creado correctamente');
  
      cy.log('Fin de prueba 3');
    })    

    it('Prueba 4 - Crear cliente a medias falla', () => {
      let testName = 'Bismark Lepe';
      let testPhone = '123456789'
      cy.log('Prueba 4: Crear cliente a medias falla');
  
      cy.get('input#name').type(testName);
      cy.get('input#phone').type(testPhone);
      cy.get('button#create-client-button').contains('Add').click();

      cy.contains('Please fill in all fields').should('exist');
  
      cy.log('Fin de prueba 4');
    })
  })