# CI/CD Pipeline para Testes Automatizados - Outsera

Este projeto contém um pipeline CI/CD para executar testes automatizados, garantindo qualidade contínua do código. O pipeline abrange testes de API, E2E, carga e aplicativos móveis.

## Estrutura do Pipeline

### 1. Requisitos
- **Node.js**: Versão 16 ou superior.
- **Ferramentas do CI/CD**: Suporte ao GitHub Actions ou similar.
- **Dependências**: Cypress, Allure, K6, Maestro, Appium.

### 2. Instalação e Configuração

1. **Checkout do Repositório**: Clone o repositório.
2. **Configurar Node.js**: Versão 16.
3. **Instalar Dependências**: Execute `npm install`.
4. **Reinstalar Dependências**: Remova `node_modules` e instale novamente.

### 3. Testes Automatizados

#### 3.1 Testes de Carga - K6
- **Objetivo**: Avaliar a performance.
- **Teste**: Script em `load-tests/load-test.js` simula até 500 usuários. Valida resposta `200` e gera relatório com análise.

#### 3.2 Testes de API - IBGE
- **Objetivo**: Automatizar e validar respostas de API.
- **Testes Incluídos**: Lista de estados, detalhes do estado de SP, casos de erro (ID inválido, filtro inexistente, falta de autorização). Validações de status e tempo de resposta.
- **Relatório**: Gera relatório Allure.

#### 3.3 Testes End-to-End (E2E) - Cucumber
- **Objetivo**: Validar fluxos críticos usando Gherkin.
- **Fluxo de Login**: Testes definidos no `login.feature`.
- **Fluxo de Checkout**: Valida adição de produtos e finalização da compra.
- **Relatório**: Relatório E2E detalhado.

#### 3.4 Testes para Aplicativos Móveis - Maestro
- **Objetivo**: Testar a usabilidade móvel.
- **Fluxo de Login**: Testa login e navegação inicial.
- **Teste de Formulário**: Valida preenchimento e envio.
- **Relatório**: Gera relatório detalhado.

### 4. Relatórios de Testes
- **Mochawesome**: Relatórios HTML e JSON em `cypress/reports`.
- **Allure**: Resultados detalhados para testes de API e E2E.
- **Maestro**: Relatórios de testes móveis.
- **K6**: Relatórios de performance da API.

### 5. Execução do Pipeline
- **Branches Monitoradas**: `main`, `ci-pipeline`, `testes-automatizados`, `maestro`.
- **Trigger**: Push ou pull request.

### 6. Tecnologias Utilizadas
- **Node.js**, **Cypress**, **Cucumber**, **Allure**, **Maestro**, **K6**, **Appium**.

### 7. Configurações do Cypress
- **Comandos Personalizados**: `commands.js` para login e outras ações comuns.
- **Página de Login**: `LoginPage.js` encapsula ações da página de login.
- **Configurações Globais**: `e2e.js` para comportamentos comuns.
- **Configurações**: `cypress.config.js` define relatórios, captura de screenshots e integração com Cucumber.

## Considerações Finais
Este pipeline visa garantir a qualidade contínua do projeto. Pode ser expandido conforme necessário para incluir mais verificações e ferramentas.

