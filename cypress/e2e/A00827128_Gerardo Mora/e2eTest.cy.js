describe('User List Component E2E', () => {
    it('Prueba End-to-End - Crear y ver detalles de un usuario', () => {
  
    //Login access
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

      // Ensure Auth0 has redirected us back to the RWA.
      cy.wait(5000);
      cy.url().should('equal', 'http://localhost:3000/generar-perfil')
      cy.visit('http://localhost:3000/clients')
      cy.wait(5000);

      it('should create a client successfully', () => {
        let testName = 'Bismarck Lepe';
        let testEmail = 'blepe@admin.mx';
        let testPhone = '123456789'

        cy.get('button#client-creation-button').click();
        cy.get('input#name').type(testName);
        cy.get('input#email').type(testEmail.com);
        cy.get('input#phone').type(testPhone);
        cy.get('button').contains('Add').click();
        cy.wait(5000);
        cy.contains('Add').click();
        cy.wait(5000);
      });
      
      //it('should change status ', () => {
        cy.visit('http://localhost:3000/clients')
        cy.get('#client-search-select').click();
        cy.get('#client-search-select input').type('Bismar{enter}'); 

        cy.get('[data-testid="edit-pencil"]').click();
        cy.wait(5000);

        cy.get('#changeEmailTest input').type(' Test'); 
        cy.wait(5000);
        cy.contains('Update client').click();

        cy.get('#client-search-select').click();
        cy.get('#client-search-select input').type('Bismar{enter}'); 
        cy.get('[data-testid="edit-pencil"]').click();
        cy.wait(5000);
      });
      
    //})
  })