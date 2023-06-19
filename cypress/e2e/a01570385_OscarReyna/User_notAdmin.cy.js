describe('User Not Admin', () => {
    beforeEach(() => {
        let newUsername = 'panchog@tec.mx';
        let newPassword = 'wizeline000';

        cy.visit('http://localhost:3000')
        cy.origin(
            'https://dev-xo3qm08sbje0ntri.us.auth0.com',
            { args: { newUsername, newPassword } },
            ({ newUsername, newPassword }) => {
                cy.get('input#username').type(newUsername)
                cy.get('input#password').type(newPassword, { log: true })
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
    //Test 1 Wizeliner View
    it('Wizeliner view - User Section Vizualized properly', () => {
        cy.get("#selectUser").should("exist");
        cy.get("#selectRole").should("exist");
    })

    //----------------------------------------------------------------
    //Test 2 View RoadMap as Wizeliner
    it('Wizeliner view - View Roadmap', () => {
        cy.visit('http://localhost:3000/roadmap')
    })

    //----------------------------------------------------------------
    //Test 3 View another user as a Wizeliner
    it('Wizeliner view - View Another User', () => {
        cy.wait(1000)
        cy.get("#selectUser").type('Fernando Lopez  {enter}')
        cy.wait(1000)
        cy.get('[data-testid = "info_Option2256"]').should("exist").click();
    })

    //----------------------------------------------------------------
    //Test 4 Logout Button Working as intended
    it('Logout Funcionality', () => {
        cy.get("#basic-nav-dropdown").click();
        cy.wait(2000);
        cy.get("#logoutComp").click();
        cy.wait(2000);
        cy.get("button#logoutConfirmation").click();
        cy.wait(3000);
    })

    //Test 5 View Button Visible as Wizeliner
    it('Wizeliner View - View Button Visible', () => {
        cy.wait(1000)
        cy.get("#selectUser").type('Fernando Lopez  {enter}')
        cy.wait(1000)
        cy.get('[data-testid = "info_Option2256"]').should("exist").click();
    });

    //----------------------------------------------------------------
    //Test 6 Teams View as Wizeliner
    it('Wizeliner View - Teams View', () => {
        cy.visit('http://localhost:3000/teams')
    });

    //----------------------------------------------------------------
    //Test 7 Clients View as Wizeliner
    it('Wizeliner View - Clients View', () => {
        cy.visit('http://localhost:3000/clients')
    });

    //----------------------------------------------------------------
    //Test 8 Projects View as Wizeliner
    it('Wizeliner View - Projects View', () => {
        cy.visit('http://localhost:3000/projects')
    });


});

