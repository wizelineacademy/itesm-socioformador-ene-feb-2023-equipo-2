//Mi prueba E2E  -- Añadir nuevo usuario ir a deatils de perfil, roadmap y regresar a users
//Andrea Catalina Fernández Mena A01197705


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
      cy.wait(1000);
      cy.url().should('equal', 'http://localhost:3000/generar-perfil')
      cy.visit('http://localhost:3000/employees')

        //User creation steps
      cy.get("button#showEmployeecreation").click();   

      cy.get('input#name').type('Abel Fuentes');
      cy.get("input#email").type('a-fuentes@tec.mx');
      cy.get("#selectRoleBtn").type('Wizeliner {enter}');
      cy.get("button#employeeCreationBtn").contains('Add').click();  
      cy.get("button#btnContinue").click();

      //Check information was uploaded to database
      cy.reload();

      cy.get("#selectUser").type('Abel Fuentes').click();
      cy.contains('Abel Fuentes').should("exist");

      //------------------------------------------------
      //Ir a los detalles de un user en específico
      cy.get("#selectUser").type('Gerardo Mora  {enter}')
      cy.get('[data-testid = "info_Option46583"]').should("exist").click();
      cy.window().scrollTo('bottom', { duration: 500 });
      cy.window().scrollTo('top', { duration: 500 });

      //Go to my account section and move to roadmap
      cy.get("#basic-nav-dropdown").click();
      cy.get("#roadmapSend").click();

      //Regresar a users desde navbar
      cy.get("#goUsers").click();
  
    })
  })