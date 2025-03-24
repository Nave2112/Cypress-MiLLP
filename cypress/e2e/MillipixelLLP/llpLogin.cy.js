
const {LoginPage,CompaniesPage} = require('../MillipixelLLP/llp')

// // cypress/e2e/millipixell/millilogin.js
// const LoginPage = require('../pages/LoginPage');
// const CompaniesPage = require('../pages/CompaniesPage');

describe('Extract and Save Contact Details with Logos', () => {
  it('Logs in, extracts company data, and logs out', () => {
    const login = new LoginPage();
    const companies = new CompaniesPage();

    login.visit();
    login.login('alexmurphywork@gmail.com', 'Password1!');
    companies.navigateToCompanies();
        companies.extractCompanyData();
        companies.logOut();
  });
});
