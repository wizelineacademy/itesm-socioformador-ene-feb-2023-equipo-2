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
      cy.url().should('equal', 'http://localhost:3000/generar-perfil')
      cy.visit('http://localhost:3000/projects')
    });
  
    it('Prueba 5 - Carga de la página', () => {
        cy.log('Prueba 5: Carga correctamente projects');

        cy.get('#__next > div.container.pt-4.pb-2').should('exist').log('Carga correcta');;

        cy.log('Fin de prueba 5');
    })

    it('Prueba 6 - Recibir datos de tabla', () => {
        cy.log('Prueba 6: Recibir datos de tabla');

        cy.intercept('GET', '/api/getProjectList', (req) => {
            req.reply((res) => {
                res.send({status: 200});
            });
        }).as('getAllProjects');

        cy.contains('Loading...').should('not.exist');
        cy.log('Fin de prueba 6');
    })

    it('Prueba 7 - Carga de búsqueda', () => {
        cy.log('Prueba 7: Carga de búsqueda');

        cy.get('#__next > div:nth-child(3) > div').should('exist').log('Carga correcta');;

        cy.log('Fin de prueba 7');
    })

    it('Prueba 8 - Filtro usando nombre de proyecto', () => {
        cy.log('Prueba 8: Filtro usando nombre de proyecto');

        cy.get('#project-name-select').click().type('Web-Scraping Optimization').type('{enter}')

        cy.log('Prueba 8 terminada');
    })

    it('Prueba 9 - Filtro usando nombre de cliente', () => {
        cy.log('Prueba 9: Filtro usando nombre de cliente');

        cy.get('#client-select').click().type('Harmony Foods').type('{enter}')

        cy.log('Prueba 9 terminada');
    })

    it('Prueba 10 - Filtro usando estatus de proyecto', () => {
        cy.log('Prueba 8: Filtro usando estatus de proyecto');

        cy.get('#order-status-select').click().type('Pending').type('{enter}')

        cy.log('Prueba 10 terminada');
    })

    it('Prueba 11 - Ver modificación de proyecto', () => {
        cy.log('Prueba 11: Ver modificación de proyecto');

        cy.get('#row-1 > #cell-7-undefined > div > svg:first').click()

        cy.wait(5000)

        cy.url().should('eq', 'http://localhost:3000/project-modification?slug=2')

        cy.log('Prueba 11 terminada');
    })

    it('Prueba 12 - Ver info de proyecto', () => {
        cy.log('Prueba 12 - Ver info de proyecto');

        cy.get('#row-1 > #cell-8-undefined > div > svg:first').click()

        cy.wait(5000)

        cy.url().should('eq', 'http://localhost:3000/project-overview?slug=2')

        cy.log('Prueba 12 terminada');
    })

    it('Prueba 13 - Renderizar tabla en project overview', () => {
        cy.log('Inicia Prueba 11 - Mostrar tabla de equipo del proyecto');

        cy.get('#row-1 > #cell-8-undefined > div > svg:first').click()

        cy.wait(5000)

        cy.get('#__next > div.mt-3.container').should('exist').log('Render correcto');

        cy.log('Prueba 13 terminada');
    })
  })