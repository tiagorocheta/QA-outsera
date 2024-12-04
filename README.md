# Pipeline de CI/CD para Automação de Testes - Outsera

Este projeto contém um pipeline CI/CD para executar testes automatizados, garantindo qualidade contínua do código. O pipeline abrange testes de API, E2E, carga e aplicativos móveis.

## Estrutura do Pipeline

### Arquivo CI/CD (`ci.yaml`)

O pipeline CI/CD está definido no arquivo `ci.yaml` e contém as seguintes etapas:

- **Fazer checkout do repositório**: Baixa o código mais recente do repositório para o ambiente de CI.
- **Configurar Node.js**: Instala a versão 16 do Node.js necessária para executar o projeto.
- **Instalar Dependências**: Executa `npm install` para instalar todas as dependências necessárias.
- **Reinstalar Dependências para a Plataforma**: Remove o diretório `node_modules` e reinstala as dependências para garantir compatibilidade.
- **Instalar Cypress e Plugin Allure**: Instala o Cypress e o plugin Allure para geração de relatórios.
- **Configurar Plugin Allure**: Adiciona as configurações do plugin Allure no Cypress.
- **Executar Testes da API IBGE**: Executa os testes automatizados da API utilizando Cypress.
- **Gerar Relatório Allure**: Gera um relatório Allure com os resultados dos testes.
- **Fazer upload do Relatório Allure**: Envia o relatório gerado como artefato do pipeline.
- **Instalar CLI do Maestro**: Instala o Maestro CLI para execução de testes móveis.
- **Executar Teste do Maestro**: Executa os testes automatizados do aplicativo móvel `app-release.apk`.
- **Fazer upload do Relatório do Maestro**: Envia o relatório gerado dos testes móveis.
- **Instalar Preprocessador Cucumber**: Instala o preprocessador do Cucumber para integração com Cypress.
- **Instalar Dependências Adicionais**: Instala dependências adicionais necessárias para rodar os testes no ambiente de CI.
- **Executar Testes E2E (Cucumber)**: Executa os testes E2E definidos em Gherkin.
- **Gerar Relatório Allure para Testes E2E**: Gera um relatório Allure para os testes E2E.
- **Fazer upload do Relatório Allure para Testes E2E**: Envia o relatório gerado como artefato do pipeline.
- **Instalar K6**: Instala a ferramenta K6 para execução dos testes de carga.
- **Executar Teste de Carga com K6**: Executa o script de teste de carga e gera um relatório JSON com os resultados.
- **Fazer upload do Relatório de Teste de Carga**: Envia o relatório gerado dos testes de carga.

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
- **Arquivo de Testes**: `load-tests/load-test.js`.

#### 3.2 Testes de API - IBGE
- **Objetivo**: Automatizar e validar respostas de API.
- **Arquivo de Testes**: `ibge-api.cy.js`.
- **Testes Incluídos**: Lista de estados, detalhes do estado de SP, casos de erro (ID inválido, filtro inexistente, falta de autorização). Validações de status e tempo de resposta.
- **Relatório**: Gera relatório Allure.

#### 3.3 Testes End-to-End (E2E) - Cucumber
- **Objetivo**: Validar fluxos críticos usando Gherkin.
- **Arquivo de Testes**: `login.feature`.
- **Fluxo de Login**: Testes definidos no `login.feature`.
- **Fluxo de Checkout**: Valida adição de produtos e finalização da compra.
- **Relatório**: Relatório E2E detalhado.

#### 3.4 Testes para Aplicativos Móveis - Maestro
- **Objetivo**: Testar a usabilidade móvel.
- **Aplicativo**: `app-release.apk`.
- **Arquivo de Testes**: `login_fluxo.yaml`.
- **Fluxo de Login**: Testa login e navegação inicial.
- **Teste de Formulário**: Valida preenchimento e envio.
- **Relatório**: Gera relatório detalhado.

### 4. Relatórios de Testes
- **Allure**: Resultados detalhados para testes de API e E2E, incluindo relatórios HTML e JSON em `cypress/reports`.
- **Maestro**: Relatórios de testes móveis.
- **K6**: Relatórios de performance da API.

### 5. Execução do Pipeline
- **Branches Monitoradas**: `main`.
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

