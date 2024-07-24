// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('loginTechnoApp', (userName) => {
  cy.session(
    userName,
    () => {
      const email = Cypress.env(`email_${userName}`);
      const password = Cypress.env(`pass_${userName}`);

      cy.visit('https://technoapp.berijalan.id/login');
      cy.get('.login100-form input[name="email"]').type(email);
      cy.get('.login100-form input[name="password"]').type(password, {
        log: false,
      });
      cy.get('.login100-form #button-login').click();
      cy.url().should('eq', 'https://technoapp.berijalan.id/');
    },
    {
      cacheAcrossSpecs: false,
    },
  );
});

Cypress.Commands.add('visitWithMockLocation', (url, latitude, longitude) => {
  cy.visit(url, {
    onBeforeLoad(win) {
      cy.stub(win.navigator.geolocation, 'getCurrentPosition').callsFake(
        (cb, err) => {
          if (latitude && longitude) {
            return cb({coords: {latitude, longitude}});
          }
          throw err({code: 1});
        },
      );
    },
  });
});

Cypress.Commands.add('notificationWhatsApp', (userName) => {
  // Check the status of the test
  let testStatus = Cypress.mocha.getRunner().suite.ctx.currentTest.state;

  if (testStatus === 'passed') {
    testStatus = 'PASSED ✅';
  } else if (testStatus === 'failed') {
    testStatus = 'FAILED ❌';
  }

  // API endpoint to call
  const apiEndpoint = 'http://138.2.80.47:3112/api/v2/message/text';

  const data = {
    client: 'trial_acc',
    number: Cypress.env(`phone_${userName}`),
    message: `
    Holla *${userName}*,
    Test "${
      Cypress.mocha.getRunner().suite.ctx.currentTest.title
    }" has ${testStatus}
     
     #CypressAutoNotification`,
  };

  // Call the API
  cy.request({
    method: 'POST',
    url: apiEndpoint,
    headers: {
      'Content-Type': 'application/json',
    },
    body: data,
  }).then((response) => {
    // Handle the response if necessary
    expect(response.status).to.eq(200);
  });
});
