import React from 'react';
import { mount } from 'cypress-react-unit-test';
import ProjectSearch from '@/components/ProjectSearch';

describe('ProjectSearch Component', () => {
  beforeEach(() => {
    // Mount the ProjectSearch component once before any test
    cy.mount(<ProjectSearch />);
  
    // Intercept API Call for successful response
    cy.intercept('/api/getProjectList', {
      body: {
        orders: [
          {
            value: '1',
            label: 'Project 1',
            orderstatus: 'Approved',
            orderstartdate: '2023-01-01',
            orderenddate: '2023-01-31',
            idclient: '1',
            clientname: 'Client 1',
            idteam: '1',
            teamname: 'Team 1',
          },
          {
            value: '2',
            label: 'Project 2',
            orderstatus: 'Pending',
            orderstartdate: '2023-02-01',
            orderenddate: '2023-02-28',
            idclient: '2',
            clientname: 'Client 2',
            idteam: '2',
            teamname: 'Team 2',
          },
        ],
      },
    }).as('getProjects');

    // Intercept API Call for successful client data response
    cy.intercept('/api/get-clients?id=*', {
      body: {
        client: [
          {
            value: '1',
            label: 'Client 1',
            email: 'client1@example.com',
            phone: '1234567890',
            erased: false,
          },
          {
            value: '2',
            label: 'Client 2',
            email: 'client2@example.com',
            phone: '9876543210',
            erased: false,
          },
        ],
      },
    }).as('getClients');
  });

  it('renders ProjectSearch component', () => {  
    // Assert that the component renders correctly
    cy.wait(['@getProjects', '@getClients']);
    cy.contains('Add Project').should('exist');
  });

  it('should toggle the button text between "Add Project" and "Close"', () => {
    // Get the button element using data-test attribute
    cy.get('[data-test="add-project-button"]').as('addProjectButton');

    // Check initial button text
    cy.get('@addProjectButton').should('be.visible').and('contain', 'Add Project');

    // Click the button
    cy.get('@addProjectButton').click({ force: true });

    // Check if the button text changes to "Close"
    cy.get('@addProjectButton').should('contain', 'Close');

    // Click the button again
    cy.get('@addProjectButton').click({ force: true });

    // Check if the button text changes back to "Add Project"
    cy.get('@addProjectButton').should('contain', 'Add Project');
  });

  it('should have project names in the select', () => {
    cy.get('#project-name-select').should('not.be.empty');
  });

  it('should have clients in the select', () => {
    cy.get('#client-select').should('not.be.empty');
  });

  it('should have order statuses in the select', () => {
    cy.get('#order-status-select').should('not.be.empty');
  });

  it('Button Loads', () => {
    cy.contains('Add Project').should('exist');
  });
});