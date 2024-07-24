const daihatsuCars = require('../../../fixtures/SEVA/sanitize/daihatsu_cars.json');

before(() => {
  Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false;
  });
});

describe('Testing on Daihatsu brand', { testIsolation: false }, function () {
  beforeEach(() => {
    // Intercept all network requests and suppress logs
    cy.intercept(
      {
        // Match all URLs
        url: '*',
      },
      (req) => {
        req.on('before:response', (res) => {
          // Suppress the log for this request
          res.headers['x-cypress-log'] = 'false';
        });
      }
    );
  });

  daihatsuCars.forEach((car) => {
    it(`Should display correct PDP for ${car.car_name}`, () => {
      cy.visit(`https://www.seva.id/mobil-baru/${car.brand.toLowerCase()}/${car.model_slug}/jakarta-pusat?loanRankCVL=Green&source=plp`);
      cy.wait(2000); // Tunggu sebentar agar halaman bisa dimuat
      cy.get('[data-testid="text-car-brand-model"]').should('exist').and('have.text', car.car_name);
    });
  });
})
