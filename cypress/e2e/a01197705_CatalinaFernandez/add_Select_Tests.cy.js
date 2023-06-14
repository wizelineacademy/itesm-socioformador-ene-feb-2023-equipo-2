//Mis pruebas unitarias -- Pruebas de tipo Add y Select de la sección de Users
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
      //Test 1 El botón funciona y se le da click y se despliega
    it('Add user button deploys correctly', () => {
        cy.contains("Add Users")
        .should("be.visible");

      cy.get("button#showEmployeecreation").should("exist").click();    
    });


//--------------------------------------------------------------------------------------------      
    //Test 2 El botón funciona y se le da click y muestra los componentes
    it('Add user button deployed show its elements', () => {
        cy.contains("Add Users")
        .should("be.visible");

      cy.get("button#showEmployeecreation").should("exist").click();    
       cy.get("input#name").should("exist");
       cy.get("input#email").should("exist");
       cy.get("#selectRoleBtn").should("exist");
       cy.get("button#employeeCreationBtn").should("exist");

    });


//--------------------------------------------------------------------------------------------      
    //Test 3 Admin visualization 

    it('Admin view - User Section Vizualized properly', () => {
      cy.get("#selectUser").should("exist");
      cy.get("#selectRole").should("exist");
      cy.contains("Add Users").should("be.visible");
      cy.get("button#showEmployeecreation").should("exist").click();    
        cy.get("input#name").should("exist");
        cy.get("input#email").should("exist");
        cy.get("#selectRoleBtn").should("exist");
        cy.get("button#employeeCreationBtn").should("exist");

  });


//--------------------------------------------------------------------------------------------      
    //Test 4 User Visualization

    it('User view - User Section Vizualized properly', () => {
      cy.get("#selectUser").should("exist");
      cy.get("#selectRole").should("exist");
  });


//--------------------------------------------------------------------------------------------      
    //Test 5 Input Name for new User Working
    it('Input Name - Add new user section working properly', () => {
    let test = "name test";
    cy.get("button#showEmployeecreation").should("exist").click();    
     cy.get('input#name').type(test)
  });


//--------------------------------------------------------------------------------------------      
    //Test 6 Input Email for new User Working
    it('Input Email - Add new user section working properly', () => {
      let testMail = "example@mail.com";
      cy.get("button#showEmployeecreation").should("exist").click();    
       cy.get('input#email').type(testMail)
    });


//--------------------------------------------------------------------------------------------      
    //Test 7 Select Role for new User Working
    it('Select Role- Add new user section working properly', () => {
      let testSelect = "Wizeliner";
      cy.get("button#showEmployeecreation").should("exist").click();    
       cy.get("#selectRoleBtn").type(testSelect)
    });


//--------------------------------------------------------------------------------------------      
    //Test 8 Add New User Test
    it('Add user button deployed show its elements', () => {
    let nameTest = "Catalina Fernandez"
    let emailTest = "katy@tec.mx"
    let testSelect = "Wizeliner";

    cy.contains("Add Users").should("be.visible");
    cy.get("button#showEmployeecreation").should("exist").click();   

     cy.get("input#name").type(nameTest);
     cy.get("input#email").type(emailTest);
     cy.get("#selectRoleBtn").type(testSelect).click();
     cy.get("button#employeeCreationBtn").should("exist").click();  

  });


//---------------------------------------------------------------------------------------------------
  //Test 9 Button to Confirm New User Created
  it('Add user - Button confirmation working properly', () => {
    let nameTest = "Jorge Robles";
    let emailTest = "j-robles@tec.mx";
    let testSelect = "Wizeliner";

    cy.get("button#showEmployeecreation").should("exist").click();   
     cy.get("input#name").type(nameTest);
     cy.get("input#email").type(emailTest);
     cy.get("#selectRoleBtn").type(testSelect).click();
     cy.get("button#employeeCreationBtn").should("exist").click();  
     cy.contains("Continue").should("be.visible");
    cy.get("button#btnContinue").should("exist").click();

  });


//---------------------------------------------------------------------------------------------------
  //Test 10 User Select working properly
  it('User view - User Section Vizualized properly', () => {

    let nameSearch = "Katy Fernandez"

    cy.get("#selectUser").should("exist");
    cy.get("#selectUser").type(nameSearch).click(); 

}); 


//---------------------------------------------------------------------------------------------------
  //Test 11 Role Select working properly
  it('User view - User Section Vizualized properly', () => {
    let roleSearch = "Wizeliner";

    cy.get("#selectRole").should("exist");
    cy.get("#selectRole").type(roleSearch).click();
}); 


});