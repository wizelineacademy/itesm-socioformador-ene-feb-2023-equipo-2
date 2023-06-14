


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

    it('Prueba 1 - Project Component Render', () => {
        cy.log('Inicia prueba 1 - Project Component Render');

        cy.get('#__next > div.container.pt-4.pb-2').should('exist').log('Project Component Renderizado');;

        cy.log('Prueba 1 terminada');
    })

    it('Prueba 2 - Project Search Bar Component', () => {
        cy.log('Inicia prueba 2 - Project Search Bar Component');

        cy.get('#__next > div:nth-child(3) > div').should('exist').log('Project Search Bar Renderizada');;

        cy.log('Prueba 2 terminada');
    })

    it('Prueba 3 - Projects API Call', () => {
        cy.log('Inicia prueba 3 - Projects Table Component');

        cy.intercept('GET', '/api/geProjectList', (req) => {
            req.reply((res) => {
                res.send({ status: 200 });
            });
        }).as('getAllEmployees');

        cy.contains('Loading...').should('not.exist');
        cy.log('Prueba 3 terminada');
    })

    it('Prueba 4 - Projects Table Component', () => {
        cy.log('Inicia prueba 3 - Projects Table Component');

        cy.get('#__next > div.container.my-4 > div.sc-ePzlA-D.dlUCce').should('exist').log('Project Table Renderizada');

        cy.log('Prueba 4 terminada');
    })

    it('Prueba 5 - Buscar projectos por nombre', () => {
        cy.log('Inicia prueba 5 - Buscar projectos por nombre');

        cy.get('#project-name-select').click().type('Hospitalary Transplant System').type('{enter}')

        cy.get('#__next > div.container.my-4 > div.sc-ePzlA-D.dlUCce').should('exist').log('Project Table Renderizada');

        cy.log('Prueba 5 terminada');
    })

    it('Prueba 6 - Buscar projectos por cliente', () => {
        cy.log('Inicia prueba 6 - Buscar projectos por cliente');

        cy.get('#client-select').click().type('Quantum Innovations').type('{enter}')

        cy.get('#__next > div.container.my-4 > div.sc-ePzlA-D.dlUCce').should('exist').log('Project Table Renderizada');

        cy.log('Prueba 6 terminada');
    })

    it('Prueba 7 - Buscar projectos por estatus', () => {
        cy.log('Inicia prueba 7 - Buscar projectos por nombre');

        cy.get('#order-status-select').click().type('Pending').type('{enter}')

        cy.get('#__next > div.container.my-4 > div.sc-ePzlA-D.dlUCce').should('exist').log('Project Table Renderizada');

        cy.log('Prueba 7 terminada');
    })

    it('Prueba 8 - Boton de ver informacion de proyecto', () => {
        cy.log('Inicia prueba 8 - Boton de ver informacion de proyecto');

        cy.get('#cell-8-undefined > div > svg:first').click()

        cy.wait(5000)

        cy.url().should('eq', 'http://localhost:3000/project-overview?slug=1')

        cy.log('Prueba 8 terminada');
    })

    it('Prueba 9 - Boton de edición de proyecto', () => {
        cy.log('Inicia prueba 9 - Boton de ver informacion de proyecto');

        cy.get('#cell-7-undefined > div > svg:first').click()

        cy.wait(5000)

        cy.url().should('eq', 'http://localhost:3000/project-modification?slug=1')

        cy.log('Prueba 9 terminada');
    })

    it('Prueba 10 - Mostrar requerimientos del proyecto', () => {
        cy.log('Inicia Prueba 10 - Mostrar requerimientos del proyecto');

        cy.get('#cell-8-undefined > div > svg:first').click()

        cy.wait(3000)

        cy.get('#__next > div.mt-3.container > div.row > div.d-flex.flex-row-reverse.col > button').click()

        cy.get('#collapseProjectCreation > div').should('exist').log('Project Requerimens Renderizado');

        cy.log('Prueba 10 terminada');
    })

    it('Prueba 11 - Mostrar tabla de equipo del proyecto', () => {
        cy.log('Inicia Prueba 11 - Mostrar tabla de equipo del proyecto');

        cy.get('#cell-8-undefined > div > svg:first').click()

        cy.wait(3000)

        cy.get('#__next > div.mt-3.container > div.sc-ePzlA-D.dlUCce').should('exist').log('Project Requerimens Renderizado');

        cy.log('Prueba 10 terminada');
    })

    it('Prueba 11 - Boton de crear proyecto en Admin', () => {
        cy.log('Inicia prueba 11 -  Boton de crear proyecto en Admin');

        cy.get('#__next > div:nth-child(3) > div > div:nth-child(4) > button').click()

        cy.get('#collapseProjectCreation').should('exist').log('Project Table Renderizada');

        cy.log('Prueba 11 terminada');
    })

    it('Prueba 12 - Formulario Crear proyecto', () => {
        cy.log('Inicia prueba 12 - Formulario Crear proyecto');

        cy.get('#__next > div:nth-child(3) > div > div:nth-child(4) > button').click()

        cy.get('#collapseProjectCreation > div > div > div:nth-child(1) > div > div.css-1fdsijx-ValueContainer').click().type('Hospitalary Transplant System').type('{enter}')

        cy.get('#collapseProjectCreation > div > div > div:nth-child(3) > div').click().type('Byte Builders').type('{enter}')

        cy.get('#collapseProjectCreation > div > div > div.container > div > div:nth-child(3) > div > div > div.css-1fdsijx-ValueContainer').click().type('Pending').type('{enter}')

        cy.get('#projectDescription').click().type('Web Platform to Manage Software Proyects and all their tasks, resources and data. This Software will be used by Project Managers, Developers and Clients')

        cy.get('#collapseProjectCreation > div > div > div.container > button:nth-child(13)').click()

        cy.log('Prueba 12 terminada');
    })

    it('Prueba 13 - Guardar edición de proyecto', () => {
        cy.log('Inicia prueba 13 - Guardar edición de proyecto');

        cy.get('#cell-7-undefined > div > svg:first').click()

        cy.wait(8000)

        cy.get('#__next > div.container.bg-light.border.p-4 > div > div.container > button').click()

        cy.log('Prueba 13 terminada');
    })

})