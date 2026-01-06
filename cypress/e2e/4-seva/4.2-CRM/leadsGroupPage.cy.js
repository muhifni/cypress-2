before(() => {
    Cypress.on('uncaught:exception', (err, runnable) => {
      // returning false here prevents Cypress from
      // failing the test
      return false;
    });
  });

describe('Leads Group Page', () => {
    it('Should display leads group page', () => {
        cy.visit('https://crm-fe.prod.seva.id/login');
        cy.get('input[name="email"]').type('testing-qa@seva.id');
        cy.get('input[name="password"]').type('Pass123@');
        cy.get('button[type="submit"]').click();
        cy.wait(2000);

        // user should be redirected to home page
        // get url
        cy.url().should('eq', 'https://crm-fe.prod.seva.id/');

        // visit leads group page
        cy.visit('https://crm-fe.prod.seva.id/leads-group');
        cy.wait(5000);

        // get url
        cy.url().should('eq', 'https://crm-fe.prod.seva.id/leads-group');

        // get title
        cy.title().should('eq', 'Leads Group - SEVA CRM');



    });
});
