Feature: Login na aplicação web

Scenario: Login bem-sucedido na página principal
  Given que o usuário está na página de login
  When o usuário insere "standard_user" no campo de username
  And o usuário insere "secret_sauce" no campo de password
  And o usuário clica no botão de login
  Then a página de produtos deve ser exibida
