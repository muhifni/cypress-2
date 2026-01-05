const fixtureUsersVPN = require('../../../fixtures/user-vpn-techno.json');

beforeEach(() => {
  Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false;
  });
});

describe('Pritunl Create User', {testIsolation: false}, () => {
  it('Login VPN', () => {
    // Kunjungi halaman login terlebih dahulu
    cy.visit('https://openvpn.berijalan.id/login');
    cy.wait(3000);

    // Cek apakah sudah login dengan memeriksa URL atau elemen tertentu
    cy.url().then((currentUrl) => {
      if (currentUrl !== 'https://openvpn.berijalan.id/login') {
        // Sudah login, langsung redirect ke halaman user
        cy.visit('https://openvpn.berijalan.id/#/users');
      } else {
        // Belum login, lakukan login
        cy.get('#username').type('admin');
        cy.get('#password').type(
          '6LNSYSwM9QybMgVeysYEwO8MrcLhHcfWbWF3kIpuKHGfjR5PRc',
        );
        cy.get('#submit').click();
        cy.url().should('equal', 'https://openvpn.berijalan.id/');

        // Setelah login, redirect ke halaman user
        cy.visit('https://openvpn.berijalan.id/#/users');
      }
    });

    cy.wait(3000);
  });

  let number = 0;

  fixtureUsersVPN.forEach((user) => {
    it(`Cheking VPN User ${user.name}`, () => {
      number = number + 1;
      // Check whether the VPN user has been created or not
      cy.get(':nth-child(3) > .users-list-header > .org-search')
        .clear()
        .type(user.npk);
      cy.wait(3000);

      // Setelah pencarian, cek apakah elemen user ada
      cy.get('body').then(($body) => {
        // Cek apakah elemen user ada di DOM
        if (
          $body.find(
            ':nth-child(3) > .users-list-container > :nth-child(1) > .user > .name-container',
          ).length > 0
        ) {
          // Jika user ditemukan
          cy.log('User has been created');

          // Cek apakah user sudah pernah digunakan
          cy.get(
            ':nth-child(3) > .users-list-container > :nth-child(1) > .user > .user-last-active > .title',
          ).then(($title) => {
            // Ambil text dari elemen dan cek apakah valuenya "Never"
            if ($title.text().trim() === 'Never') {
              // Jika valuenya "Never", ganti PIN
              cy.get(
                ':nth-child(3) > .users-list-container > :nth-child(1) > .user > .name-container > .user-name',
              ).click();
              cy.wait(3000);

              // Ganti PIN VPN
              cy.get('.pin > .form-control').clear().type(user.vpn_pin);

              // submit
              cy.get('.modal-footer > .btn-primary').click();
              cy.wait(2000);

              // cy.get('.btn-default').click();

              cy.readFile('cypress/fixtures/user-vpn-techno-copy.json').then(
                (data) => {
                  const update = data.find((item) => item.npk === user.npk);
                  update.pin_changed = 'true';
                  update.vpn_last_used = $title.text();
                  update.vpn_is_created = 'true';

                  cy.writeFile(
                    'cypress/fixtures/user-vpn-techno-copy.json',
                    JSON.stringify(data),
                  );
                },
              );

              cy.log("User's PIN has been changed");
            } else {
              // Jika valuenya bukan "Never", tidak perlu ganti PIN
              cy.readFile('cypress/fixtures/user-vpn-techno-copy.json').then(
                (data) => {
                  const update = data.find((item) => item.npk === user.npk);
                  update.pin_changed = 'false';
                  update.vpn_last_used = $title.text();
                  update.vpn_is_created = 'true';

                  cy.writeFile(
                    'cypress/fixtures/user-vpn-techno-copy.json',
                    JSON.stringify(data),
                  );
                },
              );

              cy.log('User has been active before, no need to change PIN');
            }
          });

          // cy.readFile('cypress/fixtures/user-vpn-techno-copy.json').then(
          //   (data) => {
          //     data.push({
          //       id: number,
          //       npk: user.npk,
          //       name: user.name,
          //       role: user.role,
          //       email: user.email,
          //       type: user.type,
          //       status: user.status,
          //       vpn_is_priority: user.vpn_is_priority,
          //       vpn_is_created_before: user.vpn_is_created,
          //       vpn_is_created: 'true',
          //       vpn_pin: user.vpn_pin,
          //     });

          //     cy.writeFile(
          //       'cypress/fixtures/user-vpn-techno-copy.json',
          //       JSON.stringify(data),
          //     );
          //   },
          // );
        } else {
          // Jika user tidak ditemukan
          cy.log('User has not been created');

          // tambahkan user
          cy.get('.orgs-add-user').click();
          cy.wait(2000);

          // input name
          cy.get('.name > .form-control')
            .clear()
            .type('A' + user.npk);

          // select vpn category
          cy.get('.org > .form-control').select('65ff7e94480d925db190d6d9');

          // input email
          cy.get('.email > .form-control').clear().type(user.email);

          // input pin
          cy.get('.pin > .form-control').clear().type(user.vpn_pin);

          // submit
          cy.get('.modal-footer > .btn-primary').click();
          // cy.get('.btn-default').click();
          cy.wait(2000);

          cy.readFile('cypress/fixtures/user-vpn-techno-copy.json').then(
            (data) => {
              const update = data.find((item) => item.npk === user.npk);
              update.pin_changed = 'false';
              update.vpn_last_used = "Never";
              update.vpn_is_created = 'true';

              cy.writeFile(
                'cypress/fixtures/user-vpn-techno-copy.json',
                JSON.stringify(data),
              );
            },
          );

          cy.log('User has been created');

          // // search user
          // cy.get(':nth-child(3) > .users-list-header > .org-search')
          //   .clear()
          //   .type(user.npk);
          // cy.wait(3000);

          // // user should exist
          // cy.get(':nth-child(3) > .users-list-container > :nth-child(1) > .user > .name-container > .user-name').should('have.text', user.name);

          // cy.readFile('cypress/fixtures/user-vpn-techno-copy.json').then(
          //   (data) => {
          //     data.push({
          //       id: number,
          //       npk: user.npk,
          //       name: user.name,
          //       role: user.role,
          //       email: user.email,
          //       type: user.type,
          //       status: user.status,
          //       vpn_is_priority: user.vpn_is_priority,
          //       vpn_is_created_before: user.vpn_is_created,
          //       vpn_is_created: 'false',
          //       vpn_pin: user.vpn_pin,
          //     });

          //     cy.writeFile(
          //       'cypress/fixtures/user-vpn-techno-copy.json',
          //       JSON.stringify(data),
          //     );
          //   },
          // );
        }
      });
    });
  });

  // it('Cheking VPN User', () => {
  // 	// redirect to user page
  //   cy.visit('https://openvpn.berijalan.id/#/users');
  // 	cy.wait(3000);

  //   // Check whether the VPN user has been created or not
  //   cy.get(':nth-child(3) > .users-list-header > .org-search').type('1576');
  // 	cy.wait(3000);

  //   // Setelah pencarian, cek apakah elemen user ada
  //   cy.get('body').then(($body) => {
  //     // Cek apakah elemen user ada di DOM
  //     if (
  //       $body.find(
  //         ':nth-child(3) > .users-list-container > :nth-child(1) > .user > .name-container',
  //       ).length > 0
  //     ) {
  //       // Jika user ditemukan
  //       cy.log('User has been created');
  //     } else {
  //       // Jika user tidak ditemukan
  //       cy.log('User has not been created');
  //     }
  //   });
  // });
});
