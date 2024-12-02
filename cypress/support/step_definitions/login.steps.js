import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import LoginPage from '../../support/pages/LoginPage';

Given('que o usuário está na página de login', () => {
  LoginPage.visit();
});

When('o usuário insere {string} no campo de username', (username) => {
  LoginPage.enterUsername(username);
});

When('o usuário insere {string} no campo de password', (password) => {
  LoginPage.enterPassword(password);
});

When('o usuário clica no botão de login', () => {
  LoginPage.clickLoginButton();
});

Then('a página de produtos deve ser exibida', () => {
  LoginPage.verifyProductPage();
});
