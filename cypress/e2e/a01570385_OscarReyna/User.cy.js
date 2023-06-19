describe('User as Admin', () => {
    beforeEach(() => {
        let username = 'adminadmin@tec.mx';
        let password = 'adminadmin'

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

        //Timer to wait Auth0 Autentication
        cy.wait(1000);
        //Verify we made a successfull login
        cy.url().should('equal', 'http://localhost:3000/generar-perfil')
        //Enter Users Page
        cy.visit('http://localhost:3000/employees')

    })

    //----------------------------------------------------------------
    //Test 10 Admin View
    it('Admin view', () => {
        cy.get("#selectUser").should("exist");
        cy.get("#selectRole").should("exist");
        cy.contains("Add Users").should("be.visible");
        cy.get("button#showEmployeecreation").should("exist").click();
        cy.get("input#name").should("exist");
        cy.get("input#email").should("exist");
        cy.get("#selectRoleBtn").should("exist");
        cy.get("button#employeeCreationBtn").should("exist");

    });

    //----------------------------------------------------------------
    //Test 11 View RoadMap as Admin
    it('Admin view - View Roadmap', () => {
        cy.visit('http://localhost:3000/roadmap')
    })

    //----------------------------------------------------------------
    //Test 12 View another user as a Admin
    it('Admin view - View Another User', () => {
        cy.wait(1000)
        cy.get("#selectUser").type('Fernando Lopez  {enter}')
        cy.wait(1000)
        cy.get('[data-testid = "info_Option2256"]').should("exist").click();
    })

    //----------------------------------------------------------------
    //Test 13 Edit User View as Admin
    it('Admin View - Edit User View', () => {
        cy.get("#selectUser").type('Pancho Gomez {enter}')
        cy.wait(2000)
        cy.get('[data-testid = "editOption32253"]').should("exist").click();
        cy.wait(1000)

        cy.get("input#setNewName").should("exist");
        cy.get("input#setNewEmail").should("exist");
        cy.get("button#updateUserBtn").should("exist");
    })

    //----------------------------------------------------------------
    //Test 14 Edit Button Visible as Admin
    it('Admin View - Edit Button Visible', () => {
        cy.get("#selectUser").type('Pancho Gomez {enter}')
        cy.wait(2000)
        cy.get('[data-testid = "editOption32253"]').should("exist").click();
        cy.wait(1000)
    });

    //----------------------------------------------------------------
    //Test 15 Teams View as Admin
    it('Admin View - Teams View', () => {
        cy.visit('http://localhost:3000/teams')
    });

    //----------------------------------------------------------------
    //Test 16 Clients View as Admin
    it('Admin View - Clients View', () => {
        cy.visit('http://localhost:3000/clients')
    });

    //----------------------------------------------------------------
    //Test 17 Projects View as Admin
    it('Admin View - Projects View', () => {
        cy.visit('http://localhost:3000/projects')
    });



})

