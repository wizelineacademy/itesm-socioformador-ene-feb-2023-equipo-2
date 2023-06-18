//Mis pruebas unitarias -- Pruebas de la tabla de la sección de Users
//Andrea Catalina Fernández Mena A01197705
describe('Add new employee', () => {

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
        // Ensure Auth0 has redirected us back to the RWA.
        cy.wait(1000);
        cy.url().should('equal', 'http://localhost:3000/generar-perfil')
        cy.visit('http://localhost:3000/employees');  //Ruta del componente
      });


//--------------------------------------------------------------------------------------------      
      //Test 12 Se visualiza sección de email en la tabla
    it('User Email - table visualization', () => {
      //cy.get('[data-testid = "tableUsersInfo]').should("exist");   
      cy.contains("Email").should("exist"); 
    });


//--------------------------------------------------------------------------------------------      
      //Test 13 Se visualiza sección de linkedIn en la tabla
      it('User Linkedin Link - table visualization', () => {
        //cy.get('[data-testid = "tableUsersInfo]').should("exist");   
        cy.contains("LinkedIn Link").should("exist"); 
      });

//--------------------------------------------------------------------------------------------      
      //Test 13 Se visualiza ícono de editar en la tabla
      it('User Edit and Details icon - table visualization', () => {
        cy.get('[data-testid = "editOption32176"]').should("exist");   
        cy.get('[data-testid = "info_Option32176"]').should("exist");  
      });


//--------------------------------------------------------------------------------------------      
      //Test 14 Se visualiza ícono de editar en la tabla
      it('Edit Option - Edit Option Workin Properly', () => {
        cy.get('[data-testid = "editOption32176"]').should("exist").click();   
      });


//--------------------------------------------------------------------------------------------      
      //Test 15 Se visualiza ícono de editar en la tabla
      it('Details Option - Details Option Workin Properly', () => {
        cy.get('[data-testid = "info_Option32176"]').should("exist").click();   
      });


});