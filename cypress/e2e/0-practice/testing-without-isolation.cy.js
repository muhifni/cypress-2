before(() => {
  // set viewport
  cy.viewport(1280, 720);

  Cypress.on("uncaught:exception", (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false;
  });
});

describe("Testing without Isolation", { testIsolation: false }, () => {
  it("Login technoApp", () => {
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

  it("Visit Homepage", () => {
    cy.visit("https://technoapp.berijalan.id/");
    cy.url().should("eq", "https://technoapp.berijalan.id/");
  });
});

describe("Testing without Isolation V2", { testIsolation: false }, () => {
  it("Visit Homepage", () => {
    cy.visit("https://technoapp.berijalan.id/");
    cy.url().should("eq", "https://technoapp.berijalan.id/");
  });
});

describe("Testing with Isolation", () => {
  it("Visit Homepage", () => {
    cy.visit("https://technoapp.berijalan.id/");
    cy.url().should("eq", "https://technoapp.berijalan.id/login");
  });
});
