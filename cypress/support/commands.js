



// cypress/support/commands.js

Cypress.Commands.add('loginToMedicines', (email, password) => {
  cy.visit('https://www.medicines.org.uk/emc/landing?status=1');
  cy.get('.actions-container > a.auth-login-btn').eq(0).click({ force: true });

  cy.origin('https://datapharmltd.b2clogin.com', { args: { email, password } }, ({ email, password }) => {
    cy.wait(2000);
    cy.get('#signInName').type(email);
    cy.get('input#password').type(password);
    cy.get('button#next').click();
  });

  cy.wait(2000);
});

Cypress.Commands.add('navigateToCompanies', () => {  //navigateToCompanies
  cy.get('a[href="/emc/browse-companies"]', { timeout: 10000 })
    .should('be.visible')
    .then(($el) => cy.visit($el.prop('href')));
  cy.url().should('include', '/emc/browse-companies');
});


//llp2
Cypress.Commands.add('extractCompaniesFromA_B_Z', () => {
  const targetLetters = ['A', 'B', 'Z'];
  const companyData = [];

  cy.get('.browse-menu a.emc-link').each(($link, index) => {
    const letter = $link.text().trim();

    if (targetLetters.includes(letter)) {
      cy.wrap($link).invoke('attr', 'href').then((relativeUrl) => {
        cy.visit(`https://www.medicines.org.uk${relativeUrl}`);

        cy.get('[class="browse-results"] > a').then(($companies) => {
          const total = $companies.length;
          const indexes = [0, 2, total - 1];

          indexes.forEach((i) => {
            if (i >= total) return; // skip if index out of range
            const company = $companies[i];
            const companyName = company.innerText.trim().replace(/\s+/g, '_');
            const companyUrl = company.getAttribute('href');

            // Separate processing after navigation to avoid cy.click() error
            cy.visit(`https://www.medicines.org.uk${companyUrl}`);

            cy.get('[class="company-details-contact-items"]').then(($contactSection) => {
              const contactDetails = {};
              $contactSection.find('div.company-contacts-item-title').each((_, el) => {
                const label = el.innerText.trim();
                const value = el.nextElementSibling?.innerText.trim() || '';

                if (label.includes('Address')) contactDetails.address = value;
                else if (label.includes('Telephone')) contactDetails.telephone = value;
                else if (label.includes('Fax')) contactDetails.fax = value;
                else if (label.includes('Medical Information e-mail')) contactDetails.medicalEmail = value;
                else if (label.includes('Medical Information Direct Line')) contactDetails.medicalDirectLine = value;
                else if (label.includes('Out of Hours Telephone')) contactDetails.outOfHoursTelephone = value;
              });

              cy.get('img[alt="Company image"]').invoke('attr', 'src').then((logoRelativeUrl) => {
                const logoUrl = `https://www.medicines.org.uk${logoRelativeUrl}`;
                const logoFilename = `${companyName}_logo.png`;
                const logoPath = `cypress/fixtures/logos/${logoFilename}`;

                cy.request({ url: logoUrl, encoding: 'binary' }).then((response) => {
                  expect(response.status).to.eq(200);
                  cy.task('saveLogo', { filePath: logoPath, data: response.body }).then(() => {
                    companyData.push({ company: companyName, contact: contactDetails, logo: logoFilename });
                  });
                });
              });
            });
          });

          // After processing companies in current letter, go back to A-Z list
          cy.visit('https://www.medicines.org.uk/emc/browse-companies');
        });
      });
    }
  });

  cy.then(() => {
    cy.writeFile('cypress/fixtures/company-contacts.json', companyData);
  });
});

Cypress.Commands.add('assertPageUrl', (expectedUrlPart) => {
  cy.url().should('include', expectedUrlPart);
});

Cypress.Commands.add('logoutFromMedicines', () => {
  cy.get(':nth-child(3)[class="custom-icon expand-icon"]').click({ force: true });
  cy.contains('.custom-dropdown-menu .custom-anchor-text-content', 'Log Out')
    .should('be.visible')
    .click({ force: true });
});








