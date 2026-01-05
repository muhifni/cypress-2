beforeEach(() => {
  Cypress.on("uncaught:exception", (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false;
  });
});

describe("Timesheet Muhammad Hifni", () => {
  const userName = "hifni";

  // Load the fixture before running the tests
  before(() => {
    cy.fixture("timesheet/timesheet-nov-25").as("timesheetData");
  });

  it("Fill in the timesheet", function () {
    cy.loginTechnoApp(userName);

    cy.visit("https://technoapp.berijalan.id/productivity/timesheet/3824");

    // Loop through each object in the fixture array
    this.timesheetData.forEach((entry, index) => {
      // Calculate the row index (starting from 2)
      const rowIndex = index + 2;
      index = 1;

      // add row
      if (index > 0) {
        cy.get(".tbl-container > .btn").should("contain", "Add Row").click();
      }

      // change Date field (required for all statuses)
      cy.get(`#date-activity${rowIndex}`).type(entry.start_date);

      // change Status field (required for all entries)
      cy.get(`#status${rowIndex}`).select(entry.status_dropdown);

      // Only fill other fields if status is not 'Izin' or 'Cuti'
      if (!["Izin", "Cuti"].includes(entry.status_dropdown)) {
        // change Activity field
        cy.get(`#activity${rowIndex}`).type(entry.activity_desc);

        // change Project Name field
        cy.get(`#project-name${rowIndex}`).type(entry.project_name);

        // change Activity Type field
        cy.get(`#activity-type${rowIndex}`).select(
          entry.activity_type_dropdown
        );

        // change Request By field
        cy.get(`#request-by${rowIndex}`).select(entry.request_by_dropdown);

        // change Target Date field
        cy.get(`#target-date${rowIndex}`).type(entry.target_date);

        // change Time Start field
        cy.get(`#time-start${rowIndex}`).type(entry.time_start);

        // change Time End field
        cy.get(`#time-end${rowIndex}`).type(entry.time_end);
      }
    });

    // Save the entries
    //     cy.get('button[type="submit"]').click();
  });
});
