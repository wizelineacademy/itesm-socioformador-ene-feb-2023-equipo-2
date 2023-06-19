//Prueba E2E -Añadir nuevo usuario admin, ingresar con nuevo usuario y ver el perfil de otro usuario.

describe('E2E Profile Creation', () => {
    it('Prueba E2E, Entrar, Crear, Salir, Ingresar y ver detalles de un usuario', () => {
        //Login Credentials
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

        //User Creation (Admin)
        cy.get("button#showEmployeecreation").click();
        cy.wait(2000);

        cy.get('input#name').type('Pancho Gomez');
        cy.get("input#email").type('panchog@tec.mx');
        cy.get("#selectRoleBtn").type('Administrador {enter}');
        cy.get("button#employeeCreationBtn").contains('Add').click();
        cy.get("button#btnContinue").click();
        cy.wait(2000);

        //Verify that the user was created
        cy.reload();

        cy.wait(2000);
        cy.get("#selectUser").type('Pancho Gomez {enter}').click();
        cy.contains('Pancho Gomez').should("exist");
        cy.wait(2000);

        //Logout to enter with new account
        cy.get("#basic-nav-dropdown").click();
        cy.wait(1000);
        cy.get("#logoutComp").click();
        cy.wait(1000);
        cy.get("button#logoutConfirmation").click();
        cy.wait(3000);

        let newUsername = 'panchog@tec.mx';
        let newPassword = 'wizeline000';

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

        //Search and check the profile of another user
        cy.get("#selectUser").type('Andrea Gonzalez  {enter}')
        cy.get('[data-testid = "info_Option77929"]').should("exist").click();
    })
})