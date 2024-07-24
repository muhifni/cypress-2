before(() => {
  Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false;
  });
});

describe('Test on Homepage SEVA', () => {
  // it('Close banner promo', () => {
  //   cy.get('#desktopBannerWrapped').should('exist');
  // });

  it('Open PLP via Hamburger menu', () => {
    // open seva web
    cy.visit('https://www.seva.id/');
    cy.scrollTo(0, 1);
    cy.wait(5000);

    // close OTR modal
    cy.get(
      '.citySelectorModal_buttonGroup__GNTXa > .button_secondary__rsPoQ',
    ).click();

    // open hamburger menu
    cy.get('[data-testid="hamburger-menu"]').should('exist').click();

    // cy.get('.menuList_container__aoPBS > :nth-child(1) > :nth-child(2)').click();
    // open PLP new Car
    cy.get('.menuList_container__aoPBS')
      .should('exist')
      // Kemudian, cari tombol di dalam elemen tersebut
      .find('button.menuItem_menu__kP4wZ')
      // verifikasi kalau elementnya ada
      .should('exist')
      .first()
      // Verifikasi bahwa tombol memiliki teks "Cari Mobil"
      .should('contain', 'Cari Mobil')
      // // Klik tombol tersebut
      .click();
    cy.get('.menuItem_slideDown__F3X0t > :nth-child(1)').click();
    cy.url().should('include', '/mobil-baru');
  });
});
