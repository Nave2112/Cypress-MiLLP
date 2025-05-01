
  // cypress/pages/LoginPage.js
  class LoginPage {
    visit() {
      cy.visit('https://www.medicines.org.uk/emc/landing?status=1');
    }
    
    login(email, password) {
      cy.loginToMedicines(email, password);
    }
  }
  

  


  // cypress/pages/CompaniesPage.js
// cypress/pages/CompaniesPage.js
class CompaniesPage {
    navigateToCompanies() {
      cy.navigateToCompanies();
    }
  
    extractCompanyData() {
      cy.extractCompaniesFromA_B_Z();
    }
  
    logOut() {
      cy.logoutFromMedicines();
    }
  }
  

  
  module.exports = {LoginPage,CompaniesPage};
  
