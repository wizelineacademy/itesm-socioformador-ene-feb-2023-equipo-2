/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap/dist/react-bootstrap.min.js';
import ReactDOM from 'react-dom';

declare global {
  namespace Cypress {
    interface Chainable {
      mountWithBootstrap: (element: JSX.Element) => void;
    }
  }
}

Cypress.Commands.add('mountWithBootstrap', (element: JSX.Element) => {
  cy.visit('about:blank', {
    onBeforeLoad: (win) => {
      const doc = win.document;
      const style = doc.createElement('style');
      style.innerHTML = `
        .fade {
          opacity: 1 !important;
        }
      `;
      doc.head.appendChild(style);
      doc.head.insertAdjacentHTML('beforeend', '<style type="text/css">' + 'body { transition: none !important; }' + '</style>');
    },
  }).then((win) => {
    win.document.write('<html><head></head><body></body></html>');
    const appElement = win.document.createElement('div');
    appElement.setAttribute('id', 'app');
    win.document.body.appendChild(appElement);
  }).then(() => {
    return cy.get('#app', { log: false }).then((appElement) => {
      ReactDOM.render(element, appElement[0]);
    });
  });
});
