before(() => {
  // set viewport
  cy.viewport(1280, 720);

  Cypress.on("uncaught:exception", (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false;
  });
});

describe("Login Technoapp", () => {
    it("Login", () => {
      cy.visit("https://technoapp.berijalan.id/login");
      cy.get('.login100-form input[name="email"]').type(
        Cypress.env("email_hifni")
      );
      cy.get('.login100-form input[name="password"]').type(
        Cypress.env("pass_hifni"),
        { log: false }
      );
      cy.get(".login100-form #button-login").click();
      cy.url().should("eq", "https://technoapp.berijalan.id/");
    });
});
