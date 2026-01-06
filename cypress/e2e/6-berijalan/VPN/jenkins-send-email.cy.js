beforeEach(() => {
  Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false;
  });
});

describe('Jenkins Send Email', {testIsolation: false}, () => {
  it('Login Jenkins', () => {
    cy.visit('https://techno-git.berijalan.id/');
    //     cy.wait(3000);
    //     cy.get('[data-testid="username-field"]').type('muhammad.gcs@gmail.com');
    //     cy.get('[data-testid="password-field"]').type('h1fn1technoberijalan,,');
    //     cy.get('[data-testid="sign-in-button"]').click();

    // Cek apakah sudah login dengan memeriksa URL atau elemen tertentu
    cy.url().then((currentUrl) => {
      cy.log(currentUrl);
      if (
        currentUrl ===
        'https://techno-git.berijalan.id/-/profile/two_factor_auth'
      ) {
        // Sudah login, langsung redirect ke halaman user
        cy.log('Sudah login');
        cy.visit('https://techno-jenkins.berijalan.id', {
          headers: {
            accept: 'application/json, text/plain, */*',
            'user-agent': 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Mobile Safari/537.36',
          },
        });


        //   cy.visit('https://www.myip.com/');
      } else {
        // Belum login, lakukan login
        cy.get('[data-testid="username-field"]').type('muhammad.gcs@gmail.com');
        cy.get('[data-testid="password-field"]').type('h1fn1technoberijalan,,');
        cy.get('[data-testid="sign-in-button"]').click();
        cy.url().should('contain', '/profile/two_factor_auth');

        cy.visit('https://techno-jenkins.berijalan.id');
        //   cy.visit('https://www.myip.com/');
      }
    });

    //     cy.visit('https://techno-jenkins.berijalan.id/');
    // cy.get('#j_username').type('admin');
    // cy.get('#j_password').type('admin123');
    // cy.get('#login-submit').click();
    // cy.wait(3000);
  });
});
