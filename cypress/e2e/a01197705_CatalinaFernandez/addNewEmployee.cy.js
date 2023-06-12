//Mis pruebas unitarias
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

      //Test 1 El botón funciona y se le da click y se despliega
    it('Employee button deploys correctly', () => {
        cy.contains("Add Employee")
        .should("be.visible");

      cy.get("button#showEmployeecreation").should("exist").click();    
    });


    //Test 2 El botón funciona y se le da click y muestra los componentes
    it('Employee button deployed show its elements', () => {
        cy.contains("Add Employee")
        .should("be.visible");

      cy.get("button#showEmployeecreation").should("exist").click();    
       cy.get("input#name").should("exist");
       cy.get("input#email").should("exist");
       cy.get("#selectRoleBtn").should("exist");
       cy.get("button#employeeCreationBtn").should("exist");

    });
});