import React from 'react';
import ClientCreation from "@/components/ClientCreation";
//comentario
describe('ClientCreation Component', () => {
  beforeEach(() => {
    cy.mount(<ClientCreation />);
  });

  it("renders the ClientCreation component", () => {
    cy.contains("Please fill out the following fields to create a client:")
      .should("be.visible");

    cy.get("input#name").should("exist");
    cy.get("input#email").should("exist");
    cy.get("input#phone").should("exist");
    cy.get("button").contains("Add").should("exist");
  });

  it('should display success message after adding a client', () => {
    let name, email, phone; // Declare variables outside the test

    cy.get('input#name').type('John Doe');
    cy.get('input#email').type('johndoe@example.com');
    cy.get('input#phone').type('1234567890');
    cy.get('button').contains('Add').click();

    // Extract input field values and store them in variables
    cy.get('input#name').invoke('val').then(nameValue => {
      name = nameValue;
    });

    cy.get('input#email').invoke('val').then(emailValue => {
      email = emailValue;
    });

    cy.get('input#phone').invoke('val').then(phoneValue => {
      phone = phoneValue;
    });

    cy.intercept('POST', 'http://localhost:8080/api/create-client', (req) => {
      req.reply({
        statusCode: 201,
        body: {
          id: 1, // You can generate a unique ID or use a predefined value
          name: name, // Use the stored 'name' value
          email: email, // Use the stored 'email' value
          phone: phone, // Use the stored 'phone' value
          erased: false,
        },
      });
    }).as('createClient');

    cy.wait('@createClient', { timeout: 5000 }).then((res) => {
      cy.contains('Client added successfully').should('be.visible');
    });
  });

  it("displays missing field message when a field is left empty", () => {
    cy.get('input#name').type('John Doe');

    cy.get("button").contains("Add").click();

    cy.contains("Please fill in all fields").should("be.visible");
  });

  it("displays an error message when an error occurs", () => {
    cy.intercept("POST", "/api/create-client", {
      statusCode: 500,
      body: { message: "An error occurred." },
      delayMs: 1000,
    }).as("getError");

    cy.get("#name").type("John Doe");
    cy.get("#email").type("johndoe@example.com");
    cy.get("#phone").type("123456789");

    cy.get("button").contains("Add").click();

    cy.wait("@getError", { timeout: 5000 }).then(() => {
      cy.contains("An error occurred.").should("be.visible")
    });
  });
});