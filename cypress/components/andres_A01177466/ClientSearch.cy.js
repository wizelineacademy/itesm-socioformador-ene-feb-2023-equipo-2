import React from 'react';
import ClientSearch from "@/components/ClientSearch";

describe('ClientSearch Component', () => {
  beforeEach(() => {
    // Mount the ClientSearch component once before any test
    cy.mount(<ClientSearch />);
  
    // Intercept API Call for successful response
    cy.intercept('/api/get-clients*', {
      body: {
        client: [
          {
            value: "1",
            label: "Client 1",
            email: "client1@example.com",
            phone: "1234567890",
            erased: false
          },
          {
            value: "2",
            label: "Client 2",
            email: "client2@example.com",
            phone: "9876543210",
            erased: false
          }
        ]
      }
    }).as('getClients');
  });

  it('renders ClientSearch component', () => {  
    // Assert that the component renders correctly
    cy.get('.container').should('exist');
    cy.get('.row').should('exist');
    cy.get('.col-md-10').should('exist');
    cy.get('.col-md-2').should('exist');
    cy.get('[data-test="add-client-button"]').should('exist');
  });

  it('should load the clients into clientList', () => {
    // Wait for the API call to complete
    cy.wait('@getClients');
  
    // Assert that the Select component is visible
    cy.get('#client-search-select').should('be.visible');
  });

  it('should toggle the button text between "Add Clients" and "Close"', () => {
    // Get the button element using data-test attribute
    cy.get('[data-test="add-client-button"]').as('addClientsButton');

    // Check initial button text
    cy.get('@addClientsButton').should('be.visible').and('contain', 'Add Clients');

    // Click the button
    cy.get('@addClientsButton').click({ force: true });

    // Check if the button text changes to "Close"
    cy.get('@addClientsButton').should('contain', 'Close');

    // Click the button again
    cy.get('@addClientsButton').click({ force: true });

    // Check if the button text changes back to "Add Clients"
    cy.get('@addClientsButton').should('contain', 'Add Clients');
  });
});
