beforeEach(() => {
  // set viewport
  cy.viewport(1280, 720);

  Cypress.on("uncaught:exception", (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false;
  });

  // cy.session(
  //     "testSessionLogin",
  //     () => {
  //       cy.loginUser(Cypress.env("email_hifni"), Cypress.env("pass_hifni"));
  //     },
  //     {
  //       cacheAcrossSpecs: true,
  //     }
  //   );
});

function performLoginAndCheck(url, email, password) {
  cy.visit(url);
  cy.get('.login100-form input[name="email"]').type(email);
  cy.get('.login100-form input[name="password"]').type(password, {
    log: false,
  });
  cy.get(".login100-form #button-login").click();
  cy.url().should("eq", "https://technoapp.berijalan.id/");
}

function performCheckIn(url, latitude, longitude) {
  cy.visitWithMockLocation(url, latitude, longitude);
  cy.get('input[type="button"][value="Check In"]');
  cy.wait(3000);
  cy.get('input[type="button"][value="Check In"]').click();
}

describe("Check-In Technoapp Muhammad Hifni", { testIsolation: false }, () => {
  before(() => {
    // ensure clean test slate for these tests
    cy.then(Cypress.session.clearCurrentSessionData);
    cy.clearCookies();
    cy.clearLocalStorage();
  });

  it("Do Login technoApp Muhammad Hifni", () => {
    performLoginAndCheck(
      "https://technoapp.berijalan.id/login",
      Cypress.env("email_hifni"),
      Cypress.env("pass_hifni")
    );
  });

  it("Do Check-In Muhammad Hifni", () => {
    performCheckIn(
      "https://technoapp.berijalan.id/absence/checkin",
      -7.7821796119546764,
      110.39548040732839
    );
  });

  it("Do Verfication Check-In Muhammad Hifni", () => {
    performCheckIn(
      "https://technoapp.berijalan.id/absence/checkin",
      -7.7821796119546764,
      110.39548040732839
    );

    cy.on("window:alert", (str) => {
      expect(str).to.include("Anda Sudah Melakukan check in");
    });
  });
});

describe("Check-In Technoapp Peter", { testIsolation: false }, () => {
  before(() => {
    // ensure clean test slate for these tests
    cy.then(Cypress.session.clearCurrentSessionData);
    cy.clearCookies();
    cy.clearLocalStorage();
  });

  it("Do Login technoApp Peter", () => {
    performLoginAndCheck(
      "https://technoapp.berijalan.id/login",
      Cypress.env("email_peter"),
      Cypress.env("pass_peter")
    );
  });

  it("Do Check-In Peter", () => {
    performCheckIn(
      "https://technoapp.berijalan.id/absence/checkin",
      -7.7821796119546764,
      110.39548040732839
    );
  });

  it("Do Verfication Check-In Peter", () => {
    performCheckIn(
      "https://technoapp.berijalan.id/absence/checkin",
      -7.7821796119546764,
      110.39548040732839
    );

    cy.on("window:alert", (str) => {
      expect(str).to.include("Anda Sudah Melakukan check in");
    });
  });
});
