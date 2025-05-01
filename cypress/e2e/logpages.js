class Login_Page {
  elements = {
    loginBtn: '.actions-container > a.auth-login-btn',
    username: '#signInName',
    password: 'input#password',
    submitBtn: 'button#next',
    userMenu: ':nth-child(3)[class="custom-icon expand-icon"]',
    logoutLink: '.custom-dropdown-menu .custom-anchor-text-content:contains("Log Out")'
  };

  visit() {
    //cy.visit('https://www.medicines.org.uk/emc/landing?status=1');
    cy.visit('https://www.medicines.org.uk/emc/browse-companies');   //without login direct page to companies
  }

  clickLogin() {
    cy.get(this.elements.loginBtn).first().click({ force: true });
  }

  login(email, password) {
    cy.origin('https://datapharmltd.b2clogin.com', { args: { email, password } }, ({ email, password }) => {
      cy.get(this.elements.username).type(email);
      cy.get(this.elements.password).type(password);
      cy.get(this.elements.submitBtn).click();
    });
    cy.wait(2000);
  }

  logout() {
    cy.get(this.elements.userMenu).click({ force: true });
    cy.get(this.elements.logoutLink).should('be.visible').click({ force: true });
  }
}

export default Login_Page;


  
