beforeEach(() => {
  Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false;
  });
});

describe('Timesheet Muhammad Hifni', () => {
  const userName = 'hifni';

  // Load the fixture before running the tests
  before(() => {
    cy.fixture('timesheet-juli').as('timesheetData');
  });

  it('Fill in the timesheet', function () {
    cy.loginTechnoApp(userName);
    cy.visit('https://technoapp.berijalan.id/productivity/timesheet');
    cy.url().should('include', '/productivity/timesheet');

    // open timesheet
    cy.get(':nth-child(2) > :nth-child(8) > a > .fas').click();

    // close hamburger menu
    cy.get('.main-header > :nth-child(1) > .nav-item > .nav-link').click();

    // Loop through each object in the fixture array
    this.timesheetData.forEach((entry, index) => {
      // Calculate the row index (starting from 2)
      const rowIndex = index + 2;
      index = 1;

      // add row
      if (index > 0) {
        cy.get('.tbl-container > .btn').should('contain', 'Add Row').click();
      }

      // change Date field
      cy.get(`#date-activity${rowIndex}`).type(entry.start_date);

      // change Project Name field
      cy.get(`#project-name${rowIndex}`).type(entry.project_name);

      // change Activity Type field
      cy.get(`#activity-type${rowIndex}`).select(entry.activity_type_dropdown);

      // change Request By field
      cy.get(`#request-by${rowIndex}`).select(entry.request_by_dropdown);

      // change Target Date field
      cy.get(`#target-date${rowIndex}`).type(entry.target_date);

      // change Status field
      cy.get(`#status${rowIndex}`).select(entry.status_dropdown);

      // change Time Start field
      cy.get(`#time-start${rowIndex}`).type(entry.time_start);

      // change Time End field
      cy.get(`#time-end${rowIndex}`).type(entry.time_end);
    });

    // Save the entries
//     cy.get('button[type="submit"]').click();
  });
});
