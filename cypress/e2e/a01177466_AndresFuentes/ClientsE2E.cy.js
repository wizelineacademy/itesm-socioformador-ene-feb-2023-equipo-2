describe('Client Page', () => {
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
    cy.url().should('equal', 'http://localhost:3000/generar-perfil')
    cy.visit('http://localhost:3000/clients')
  });

  it('should create a client successfully', () => {
    let name, email, phone; // Declare variables outside the test
  
    cy.get('[data-test="add-client-button"]').as('addClientsButton');
  
    cy.get('@addClientsButton').click({ force: true });
  
    cy.get('input#name').type('Maria Lopez');
    cy.get('input#email').type('maria@example.com');
    cy.get('input#phone').type('1234567890');
    cy.get('button').contains('Add').click();
    cy.wait(5000);
    cy.contains('Add').click();
    cy.wait(5000);
  });
  
  it('should change status ', () => {
    cy.visit('http://localhost:3000/clients')
    cy.get('#client-search-select').click();
    cy.get('#client-search-select input').type('Mar{enter}'); 
    cy.get('[data-testid="edit-pencil"]').click();
    cy.wait(5000);
    cy.get('#client-status-change').click();
    cy.get('#client-status-change input').type('D{enter}{enter}'); 
    cy.wait(5000);
    cy.contains('Update client').click();
    cy.wait(5000);
    cy.get('#client-search-select').click();
    cy.get('#client-search-select input').type('Mar{enter}'); 
    cy.get('[data-testid="edit-pencil"]').click();
    cy.wait(5000);
  });
  
});