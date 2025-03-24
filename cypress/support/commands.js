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





// Cypress.Commands.add("login", (username, password) => {
//  //   cy.visit("/");
//     // cy.get('[type="text"]').type(username);
//     // cy.get('[name="password"]').type(password);  //[name="password"]
//     // cy.get('[class="btn"]').click();

//     //for practice automation
//     cy.get('[name="username"]').clear().type(username);
//     cy.get('[name="password"]').clear().type(password);  //[name="password"]
//     cy.get('[class="btn"]').click();
//   });
// Cypress.Commands.add('login', (username, password) => {
//   //cy.log(`Username: ${username}, Password: ${password}`);
//  // console.log(`Username: ${username}, Password: ${password}`);
  
//   cy.get('[name="username"]').clear().type(username).should('be.visible'); // This will fail if username is undefined
//   cy.get('[name="password"]').clear().type(password).should('be.visible') // This will fail if password is undefined
//   cy.get('[class="btn"]').click();
// });

  

//   Cypress.Commands.add("logout", () => {
//     cy.get('[style="color:#ffffff"]').click({force:true});
//     //cy.get('.oxd-dropdown-menu >li:nth-child(4)').click()
//     cy.log("User Student has logged out successfully");
//     //cy.pause()
   
//   });  


//   Cypress.Commands.add('conduit',()=>{
//       cy.visit('https://conduit.bondaracademy.com/')
//        cy.get(':nth-child(2)>[class="nav-link"]').click()
//        cy.get('[placeholder="Email"]').type('snaveen2112@gmail.com')
//        cy.get('[type="password"]').type('Snaveen@1996')
//        cy.get('[type="submit"]').click()
//   })


  // cypress/support/commands.js

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

Cypress.Commands.add('navigateToCompanies', () => {
  cy.get('a[href="/emc/browse-companies"]', { timeout: 10000 })
    .should('be.visible')
    .then(($el) => cy.visit($el.prop('href')));
  cy.url().should('include', '/emc/browse-companies');
});

Cypress.Commands.add('extractCompanyData', () => {
  cy.get('[class="browse-results"] > a').then(($companies) => {
    const companyData = [];
    const indexes = [0, 2, $companies.length - 1];

    indexes.forEach((index) => {
      const company = $companies[index];
      const companyName = company.innerText.trim().replace(/\s+/g, '_');

      cy.wrap(company).invoke('attr', 'href').then((relativeUrl) => {
        cy.visit(`https://www.medicines.org.uk${relativeUrl}`, { timeout: 10000 });

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
            const logoPath = `cypress/fixtures/logos1/${logoFilename}`;

            cy.request({ url: logoUrl, encoding: 'binary' }).then((response) => {
              expect(response.status).to.eq(200);
              cy.task('saveLogo', { filePath: logoPath, data: response.body }).then(() => {
                companyData.push({ company: companyName, contact: contactDetails, logo: logoFilename });
              });
            });
          });
        });
      });
    });

    cy.then(() => cy.writeFile('cypress/fixtures/company-contacts1.json', companyData));
  });
});

// Cypress.Commands.add('logoutFromMedicines', () => {
//   cy.get(':nth-child(3)[class="custom-icon expand-icon"]').click({ force: true });
//   cy.contains('.custom-dropdown-menu .custom-anchor-text-content', 'Log Out').should('be.visible').click({ force: true });
// });
Cypress.Commands.add('assertPageUrl', (expectedUrlPart) => {
  cy.url().should('include', expectedUrlPart);
});

Cypress.Commands.add('logoutFromMedicines', () => {
  cy.get(':nth-child(3)[class="custom-icon expand-icon"]').click({ force: true });
  cy.contains('.custom-dropdown-menu .custom-anchor-text-content', 'Log Out')
    .should('be.visible')
    .click({ force: true });
});
