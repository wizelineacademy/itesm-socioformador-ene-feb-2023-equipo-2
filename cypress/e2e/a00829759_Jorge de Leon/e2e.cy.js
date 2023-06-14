describe('Projects Component', () => {
    beforeEach(() => {
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
        cy.visit('http://localhost:3000/projects')
    });

    it('Prueba General - Project Component Render', () => {
        cy.log('Inicia prueba 1 - Project Component Render');

        cy.get('#__next > div.container.pt-4.pb-2').should('exist').log('Project Component Renderizado');;

        cy.log('Prueba 1 terminada');

        cy.get('#__next > div:nth-child(3) > div').should('exist').log('Project Search Bar Renderizada');;

        cy.intercept('GET', '/api/geProjectList', (req) => {
            req.reply((res) => {
                res.send({ status: 200 });
            });
        }).as('getAllEmployees');

        cy.contains('Loading...').should('not.exist');

        cy.get('#__next > div.container.my-4 > div.sc-ePzlA-D.dlUCce').should('exist').log('Project Table Renderizada');

        cy.get('#project-name-select').click().type('Hospitalary Transplant System').type('{enter}')

        cy.get('#__next > div.container.my-4 > div.sc-ePzlA-D.dlUCce').should('exist').log('Project Table Renderizada');

        cy.log('Inicia prueba 8 - Boton de ver informacion de proyecto');

        cy.get('#cell-8-undefined > div > svg:first').should('exist').log('Project Table Renderizada');

        cy.get('#cell-7-undefined > div > svg:first').should('exist').log('Project Table Renderizada');

        cy.log('Inicia Prueba 10 - Mostrar requerimientos del proyecto');

        cy.log('Inicia prueba 12 - Formulario Crear proyecto');

        cy.get('#__next > div:nth-child(3) > div > div:nth-child(4) > button').click()

        cy.get('#collapseProjectCreation > div > div > div:nth-child(1) > div > div.css-1fdsijx-ValueContainer').click().type('Hospitalary Transplant System').type('{enter}')

        cy.get('#collapseProjectCreation > div > div > div:nth-child(3) > div').click().type('Byte Builders').type('{enter}')

        cy.get('#collapseProjectCreation > div > div > div.container > div > div:nth-child(3) > div > div > div.css-1fdsijx-ValueContainer').click().type('Pending').type('{enter}')

        cy.get('#projectDescription').click().type('Web Platform to Manage Software Proyects and all their tasks, resources and data. This Software will be used by Project Managers, Developers and Clients')

        cy.get('#collapseProjectCreation > div > div > div.container > button:nth-child(13)').click()
    })
})