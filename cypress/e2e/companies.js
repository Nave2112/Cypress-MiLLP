class CompaniesPages {
    elements = {
      browseCompaniesLink: 'a[href="/emc/browse-companies"]',
      browseMenuLinks: '.browse-menu a.emc-link',
      companyResults: '[class="browse-results"] > a',
      companyDetails: '[class="company-details-contact-items"]',  
      contactTitle : 'div.company-contacts-item-title',
      companyLogo: 'img[alt="Company image"]'
    };
  
    navigateToCompanies() {
      cy.get(this.elements.browseCompaniesLink, { timeout: 10000 })
        .should('be.visible')
        .then(($el) => cy.visit($el.prop('href')));
      cy.url().should('include', '/emc/browse-companies');
    }
  
    extractCompaniesFromAtoZ(targetLetters = ['A', 'B', 'Z']) {
      const companyData = [];
  
      cy.get(this.elements.browseMenuLinks).each(($link) => {
        const letter = $link.text().trim();
  
        if (targetLetters.includes(letter)) {
          cy.wrap($link).invoke('attr', 'href').then((relativeUrl) => {
            this.processCompaniesForLetter(relativeUrl, companyData, targetLetters);
          });
        }
      }).then(() => {
        cy.writeFile('cypress/fixtures/company-contacts.json', companyData);
      });
    }
  
    processCompaniesForLetter(relativeUrl, companyData) {
      cy.visit(`https://www.medicines.org.uk${relativeUrl}`);
  
      cy.get(this.elements.companyResults).then(($companies) => {
        const total = $companies.length;
        const indexes = [0, 2, total - 1];
  
        indexes.forEach((i) => {
          if (i >= total) return;
          const company = $companies[i];
          const companyName = company.innerText.trim().replace(/\s+/g, '_');
          const companyUrl = company.getAttribute('href');
  
          cy.visit(`https://www.medicines.org.uk${companyUrl}`);
          this.processCompanyDetails(companyName, companyData);
        });
  
        cy.visit('https://www.medicines.org.uk/emc/browse-companies');
      });
    }
  
    processCompanyDetails(companyName, companyData) {
      cy.get(this.elements.companyDetails).then(($contactSection) => {
        const contactDetails = this.extractContactInfo($contactSection[0]);
  
        cy.get(this.elements.companyLogo).invoke('attr', 'src').then((logoRelativeUrl) => {
          this.saveCompanyLogo(companyName, logoRelativeUrl, companyData, contactDetails);
        });
      });
    }
 
    extractContactInfo() {
    
        cy.get(this.elements.companyDetails).then(($contactSection) => {
         const contactDetails = {};
         $contactSection.find(this.elements.contactTitle).each((_, el) => {
          const label = el.innerText.trim();
          const value = el.nextElementSibling?.innerText.trim() || '';

          if (label.includes('Address')) contactDetails.address = value;
          else if (label.includes('Telephone')) contactDetails.telephone = value;
          else if (label.includes('Fax')) contactDetails.fax = value;
          else if (label.includes('Medical Information e-mail')) contactDetails.medicalEmail = value;
          else if (label.includes('Medical Information Direct Line')) contactDetails.medicalDirectLine = value;
          else if (label.includes('Out of Hours Telephone')) contactDetails.outOfHoursTelephone = value;
        });
    })
    }
  
    saveCompanyLogo(companyName, logoRelativeUrl, companyData, contactDetails) {
      const logoUrl = `https://www.medicines.org.uk${logoRelativeUrl}`;
      const logoFilename = `${companyName}_logo.png`;
      const logoPath = `cypress/fixtures/logos/${logoFilename}`;
  
      cy.request({ url: logoUrl, encoding: 'binary' }).then((response) => {
        expect(response.status).to.eq(200);
        cy.task('saveLogo', { filePath: logoPath, data: response.body }).then(() => {
          companyData.push({ 
            company: companyName, 
            contact: contactDetails, 
            logo: logoFilename 
          });
        });
      });
    }
  }
  
 
  export default CompaniesPages;
