before(() => {
  // set viewport
  cy.viewport(1280, 720);

  Cypress.on("uncaught:exception", (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false;
  });
});

beforeEach(() => {
  cy.session(
    "testSessionLogin",
    () => {
      cy.loginUser(Cypress.env("email_hifni"), Cypress.env("pass_hifni"));
    },
    {
      cacheAcrossSpecs: true,
    }
  );
});

describe("Login Technoapp with Session", () => {
  it("Visit Homepage", () => {
    // login(Cypress.env("email_hifni"), Cypress.env("pass_hifni"));
    cy.visit("https://technoapp.berijalan.id/");
    cy.url().should("eq", "https://technoapp.berijalan.id/");
  });

  it("Visit Homepage", () => {
    // login(Cypress.env("email_hifni"), Cypress.env("pass_hifni"));
    cy.visit("https://technoapp.berijalan.id/absence/history");
    cy.url().should("contain", "/absence/history");
  });
});
