import React from 'react';
import ClientCreation from "@/components/ClientCreation";

describe('ClientCreation Component', () => {
  beforeEach(() => {
    cy.mount(<ClientCreation />);
  });

  it("healthcheck", () => {
    cy.intercept('GET', '/api/healthcheck', (req) => {
      req.reply({
        statusCode:200,
        body: {
          status: "ok"
        }
      })
    }).as('healthcheck')
  });

  // it("renders the ClientCreation component", () => {
  //   cy.contains("Please fill out the following fields to create a client:")
  //     .should("be.visible");

  //   cy.get("input#name").should("exist");
  //   cy.get("input#email").should("exist");
  //   cy.get("input#phone").should("exist");
  //   cy.get("button").contains("Add").should("exist");
  // });

  it('should display success message after adding a client', () => {
    cy.intercept('POST', '/api/create-client', (req) => {
      req.reply({
        statusCode: 201,
        body: {
          id: 1, // You can generate a unique ID or use a predefined value
          name: 'John Doe',
          email: 'johndoe@example.com',
          phone: '1234567890',
          erased: false,
        },
      });
    }).as('createClient');

    cy.get('input#name').type('John Doe');
    cy.get('input#email').type('johndoe@example.com');
    cy.get('input#phone').type('1234567890');
    cy.get('button').contains('Add').click();

    cy.wait('@createClient').then(() => {
      cy.contains('Client added successfully').should('be.visible');
    });
  });

  // it("displays missing field message when a field is left empty", () => {
  //   cy.get('input#name').type('John Doe');

  //   cy.get("button").contains("Add").click();

  //   cy.contains("Please fill in all fields").should("be.visible");
  // });

  // it("displays an error message when an error occurs", () => {
  //   cy.intercept("POST", "/api/create-client", {
  //     statusCode: 500,
  //     body: { message: "An error occurred." },
  //     delayMs: 1000,
  //   }).as("getError");

  //   cy.get("#name").type("John Doe");
  //   cy.get("#email").type("johndoe@example.com");
  //   cy.get("#phone").type("123456789");

  //   cy.get("button").contains("Add").click();

  //   cy.wait("@getError", { timeout: 5000 }).then(() => {
  //     cy.contains("An error occurred.").should("be.visible")
  //   });
  // });
});