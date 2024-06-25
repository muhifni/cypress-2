beforeEach(() => {
  Cypress.on("uncaught:exception", (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false;
  });

  // cy.session(
  //     "testSessionLogin",
  //     () => {
  //       cy.loginTechnoApp(Cypress.env("email_hifni"), Cypress.env("pass_hifni"));
  //     },
  //     {
  //       cacheAcrossSpecs: true,
  //     }
  //   );
});

function performCheckIn(url, latitude, longitude) {
  cy.visitWithMockLocation(url, latitude, longitude);
  cy.get('input[type="button"][value="Check In"]');
  cy.wait(3000);
  cy.get('input[type="button"][value="Check In"]').click();
}

describe("Check-In Technoapp Muhammad Hifni", () => {
  it("Do Check-In Muhammad Hifni", () => {
    cy.loginTechnoApp("hifni");

    performCheckIn(
      "https://technoapp.berijalan.id/absence/checkin",
      -7.7821796119546764,
      110.39548040732839
    );
  });

  it("Do Verfication Check-In Muhammad Hifni", () => {
    cy.loginTechnoApp("hifni");

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

describe("Check-In Technoapp Peter", () => {
  it("Do Check-In Peter", () => {
    cy.loginTechnoApp("peter");

    performCheckIn(
      "https://technoapp.berijalan.id/absence/checkin",
      -7.7821796119546764,
      110.39548040732839
    );
  });

  it("Do Verfication Check-In Peter", () => {
    cy.loginTechnoApp("peter");

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
