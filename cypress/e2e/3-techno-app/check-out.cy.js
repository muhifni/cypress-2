function mockLocation(latitude, longitude) {
  return {
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
  };
}

before(() => {
  // set viewport
  cy.viewport(1280, 720);

  Cypress.on("uncaught:exception", (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false;
  });
});

// beforeEach(() => {
//   cy.session(
//     "testSessionLogin",
//     () => {
//       cy.loginUser(Cypress.env("email_hifni"), Cypress.env("pass_hifni"));
//     },
//     {
//       cacheAcrossSpecs: true,
//     }
//   );
// });

describe("Check-Out Technoapp Muhammad Hifni", { testIsolation: false }, () => {
  before(() => {
    // ensure clean test slate for these tests
    cy.then(Cypress.session.clearCurrentSessionData);
    cy.clearCookies();
    cy.clearLocalStorage();
  });

  it("Do Login technoApp Muhammad Hifni", () => {
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

  it("Do Check-Out Muhammad Hifni", () => {
    cy.visit(
      "https://technoapp.berijalan.id/absence/checkout",
      mockLocation(-7.7821796119546764, 110.39548040732839)
    );
    cy.get('input[type="button"][value="Check Out"]');
    cy.wait(3000);
    cy.get('input[type="button"][value="Check Out"]').click();
  });

  it("Do Verfication Check-Out Muhammad Hifni", () => {
    cy.visit(
      "https://technoapp.berijalan.id/absence/checkout",
      mockLocation(-7.7821796119546764, 110.39548040732839)
    );
    cy.get('input[type="button"][value="Check Out"]');
    cy.wait(3000);
    cy.get('input[type="button"][value="Check Out"]').click();

    cy.on("window:alert", (str) => {
      expect(str).to.include("Anda Sudah Melakukan check out");
    });
  });
});

describe("Check-Out Technoapp Peter", { testIsolation: false }, () => {
  before(() => {
    // ensure clean test slate for these tests
    cy.then(Cypress.session.clearCurrentSessionData);
    cy.clearCookies();
    cy.clearLocalStorage();
  });

  it("Do Login technoApp Peter", () => {
    cy.visit("https://technoapp.berijalan.id/login");
    cy.get('.login100-form input[name="email"]').type(
      Cypress.env("email_peter")
    );
    cy.get('.login100-form input[name="password"]').type(
      Cypress.env("pass_peter"),
      { log: false }
    );
    cy.get(".login100-form #button-login").click();
    cy.url().should("eq", "https://technoapp.berijalan.id/");
  });

  it("Do Check-Out Peter", () => {
    cy.visit(
      "https://technoapp.berijalan.id/absence/checkout",
      mockLocation(-7.7821796119546764, 110.39548040732839)
    );
    cy.get('input[type="button"][value="Check Out"]');
    cy.wait(3000);
    cy.get('input[type="button"][value="Check Out"]').click();
  });

  it("Do Verfication Check-Out Peter", () => {
    cy.visit(
      "https://technoapp.berijalan.id/absence/checkout",
      mockLocation(-7.7821796119546764, 110.39548040732839)
    );
    cy.get('input[type="button"][value="Check Out"]');
    cy.wait(3000);
    cy.get('input[type="button"][value="Check Out"]').click();

    cy.on("window:alert", (str) => {
      expect(str).to.include("Anda Sudah Melakukan check in");
    });
  });
});
