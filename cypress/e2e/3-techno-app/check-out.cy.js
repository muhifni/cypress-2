before(() => {
  Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false;
  });
});

function performCheckOut(url, latitude, longitude) {
  cy.visitWithMockLocation(url, latitude, longitude);
  cy.get('input[type="button"][value="Check Out"]');
  cy.wait(3000);
  cy.get('input[type="button"][value="Check Out"]').click();
}

describe('Check-Out Technoapp Muhammad Hifni', () => {
  const userName = 'hifni';
  it('Do Check-Out Muhammad Hifni', () => {
    cy.loginTechnoApp(userName);
    performCheckOut(
      'https://technoapp.berijalan.id/absence/checkout',
      -7.7821796119546764,
      110.39548040732839,
    );
  });

  it('Do Verfication Check-Out Muhammad Hifni', () => {
    cy.loginTechnoApp(userName);
    performCheckOut(
      'https://technoapp.berijalan.id/absence/checkout',
      -7.7821796119546764,
      110.39548040732839,
    );

    cy.on('window:alert', (str) => {
      expect(str).to.include('Anda Sudah Melakukan check out');
    });
  });

  // Hook to run after all tests
  afterEach(() => {
    cy.notificationWhatsApp(userName);
  });
});

describe('Check-Out Technoapp Peter', () => {
  const userName = 'peter';
  it('Do Check-Out Peter', () => {
    cy.loginTechnoApp(userName);
    performCheckOut(
      'https://technoapp.berijalan.id/absence/checkout',
      -7.7821796119546764,
      110.39548040732839,
    );
  });

  it('Do Verfication Check-Out Peter', () => {
    cy.loginTechnoApp(userName);
    performCheckOut(
      'https://technoapp.berijalan.id/absence/checkout',
      -7.7821796119546764,
      110.39548040732839,
    );

    cy.on('window:alert', (str) => {
      expect(str).to.include('Anda Sudah Melakukan check out');
    });
  });

  // Hook to run after all tests
  afterEach(() => {
    cy.notificationWhatsApp(userName);
  });
});
