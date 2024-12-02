class LoginPage {
    visit() {
      cy.visit('/');
    }
  
    enterUsername(username) {
      cy.get('[data-test="username"]').type(username);
    }
  
    enterPassword(password) {
      cy.get('[data-test="password"]').type(password);
    }
  
    clickLoginButton() {
      cy.get('[data-test="login-button"]').click();
    }
  
    verifyProductPage() {
      cy.url().should('include', '/inventory.html');
      cy.get('.title').should('contain', 'Products');
    }
  }
  
  export default new LoginPage();
  