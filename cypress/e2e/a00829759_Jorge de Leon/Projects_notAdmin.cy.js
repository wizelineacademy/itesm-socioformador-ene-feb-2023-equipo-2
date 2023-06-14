describe('Projects Component', () => {
    beforeEach(() => {
        let username = 'mario@tec.mx';
        let password = 'wizeline000';

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
        cy.visit('http://localhost:3000/projects')
    });


    it('Prueba 15 - Boton de crear proyecto no disponible si no eres admin', () => {
        cy.log('Inicia Prueba 15 - Boton de crear proyecto no disponible si no eres admin');

        cy.get('#__next > div:nth-child(3) > div > div:nth-child(4) > button').should('not.exist').log('Button to add project is blocked if user is not admin');;

        cy.log('Prueba 2 terminada');
    })

})