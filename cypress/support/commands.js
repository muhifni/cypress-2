// ***********************************************
// This example commands.js shows you how to
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

Cypress.Commands.add("loginUser", (email, password) => {
  cy.visit("https://technoapp.berijalan.id/login");
  cy.get('.login100-form input[name="email"]').type(email);
  cy.get('.login100-form input[name="password"]').type(password, {
    log: false,
  });
  cy.get(".login100-form #button-login").click();
  cy.url().should("eq", "https://technoapp.berijalan.id/");
});

Cypress.Commands.add('visitWithMockLocation', (url, latitude, longitude) => {
  cy.visit(url, {
    onBeforeLoad(win) {
      cy.stub(win.navigator.geolocation, "getCurrentPosition").callsFake(
        (cb, err) => {
          if (latitude && longitude) {
            return cb({ coords: { latitude, longitude } });
          }
          throw err({ code: 1 });
        }
      );
    },
  });
});
