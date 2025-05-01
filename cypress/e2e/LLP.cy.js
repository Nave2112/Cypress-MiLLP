
//import Login_Page from './logpages';
import CompaniesPages from '../duplicatellp/companies'
import Login_Page from '../duplicatellp/logpages'



describe('Extract and Save Contact Details with Logos', () => {


  it('Logs in, extracts company data, and logs out', () => {
    const login = new Login_Page();
    const companies = new CompaniesPages();

    login.visit();
    //login.login('alexmurphywork@gmail.com', 'Password1!');
    companies.navigateToCompanies();
    companies.extractCompaniesFromAtoZ();
    companies.processCompaniesForLetter();
    companies.processCompanyDetails();
    companies.extractContactInfo();
    companies.saveCompanyLogo();
  //  login.logout();
    
   
  });
});
