import React from 'react';
import ClientSearch from "@/components/ClientSearch";

describe('ClientSearch Component - Error Handling', () => {
  it('should handle error when API response is not received correctly', () => {
    cy.mount(<ClientSearch />);
    // Intercept API Call for error response
    cy.intercept('/api/get-clients*', {
      statusCode: 500,
      body: { message: "An error occurred." },
      delayMs: 1000,
    }).as('getError');
  
    // Exclude the beforeEach and afterEach hooks for this test
    cy.wrap(null).then(() => {
      // Assert that the Select component is not visible
      cy.get('#client-search-select').should('not.exist');
    });
  
    // Wait for the error response
    cy.wait('@getError');
  
    // Assert that the error message is displayed
    cy.contains('An error occurred.').should('be.visible');
  });
});
