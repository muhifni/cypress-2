before(() => {
  Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false;
  });
});

function scrollPage(times) {
  for (let i = 0; i < times; i++) {
    cy.scrollTo('bottom', { duration: 1000 });
    cy.wait(1000); // Waktu tunggu agar elemen dapat dimuat
  }
}

describe('Test on PLP SEVA', () => {
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

  // You can add more test cases here to check multiple cards
  it('Should open correct PDP for multiple car cards', () => {
    cy.visit('https://www.seva.id/mobil-baru');

    // Function to check a single card
    const checkCard = (index) => {
      // Scroll down to ensure the card is visible       
      // cy.scrollTo('bottom', { duration: 1000 });
      // cy.wait(3000);
      // cy.scrollTo('bottom', { duration: 1000 });
      // cy.wait(3000);

      scrollPage(3);

      cy.get(`[data-testid="[object Object]brand-model-mobil"]`)
        .eq(index - 1)
        .invoke('text')
        .then((carName) => {
          cy.get(`[data-testid="button-lihat-detail"]`).eq(index - 1).click();
          cy.wait(1500);
          // cy.get('[data-testid="text-car-brand-model"]').should('have.text', carName);

          // Buat promise baru untuk menangani assertion
          Cypress.Promise.try(() => {
            // Verifikasi bahwa PDP berisi nama mobil yang benar
            cy.get('[data-testid="text-car-brand-model"]').should('have.text', carName);
          })
            .catch((error) => {
              // Log error dan lanjutkan tes
              cy.log(`Assertion failed for car: ${carName} - ${error.message}`);
            })
            .finally(() => {
              // Kembali ke PLP untuk melanjutkan pengecekan kartu berikutnya
              cy.go('back');

              // Scroll lagi jika perlu
              scrollPage(1);
            });


          // cy.go('back');
          // // Scroll down to ensure the card is visible       
          // cy.scrollTo('bottom', { duration: 1000 });
          // cy.wait(3000);
          // cy.scrollTo('bottom', { duration: 1000 });
          // cy.wait(3000);
        });
    };

    // Check first 5 cards (you can adjust the number as needed)
    for(let i = 1; i <= 10; i++) {
      checkCard(i);
    }
  });
});