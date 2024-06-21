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

describe("Check-In Technoapp", () => {
//   it("Test Check-In without MockLocation", () => {
//     cy.visit("https://technoapp.berijalan.id/absence/checkout");
//     cy.get('input[type="button"][value="Check Out"]');
//   });

  it("Test Check-In with MockLocation", () => {
    cy.visit("https://technoapp.berijalan.id/absence/checkin", mockLocation(-7.7821796119546764, 110.39548040732839));
    cy.get('input[type="button"][value="Check In"]');
    cy.wait(3000)
    cy.get('input[type="button"][value="Check In"]').click();
  });
});
