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
  it("Login with UI", () => {
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

  it("Login with API", () => {
    cy.request({
      method: "POST",
      url: "https://technoapp.berijalan.id/login-proses", // sesuaikan dengan endpoint login yang benar
      body: {
        _token : "EVhRU4gZ61Lyrz5w2NtqWr2UzOm5LdmVdWF9oogj",
        email: Cypress.env("email_hifni"),
        password: Cypress.env("pass_hifni"),
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      // Simpan token atau cookies yang diperlukan
    });
    cy.visit("https://technoapp.berijalan.id/");
    cy.url().should("eq", "https://technoapp.berijalan.id/");
  });
});
