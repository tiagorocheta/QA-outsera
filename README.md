# Pipeline de CI/CD para Automação de Testes - Outsera

Este projeto contém um pipeline CI/CD para executar testes automatizados, garantindo qualidade contínua do código. O pipeline abrange testes de API, E2E, carga e aplicativos móveis.

## Estrutura do Pipeline

### Arquivo CI/CD (`ci.yaml`)

O pipeline CI/CD está definido no arquivo `ci.yaml` e contém as seguintes etapas:

- **Fazer checkout do repositório**: Baixa o código mais recente do repositório para o ambiente de CI.
- **Configurar Node.js e instalar dependências**: Instala a versão 18 do Node.js necessária para executar o projeto e reinstala as dependências para garantir compatibilidade.
- **Instalar Cypress e Preprocessador Cucumber**: Instala o Cypress e o preprocessador Cucumber para integração com o Cypress.
- **Instalar dependências adicionais e CLI do Maestro**: Instala dependências adicionais necessárias para rodar os testes no ambiente de CI e a CLI do Maestro para testes móveis.
- **Limpar relatórios anteriores**: Remove relatórios antigos das execuções anteriores para garantir que apenas os resultados mais recentes sejam mantidos.
- **Executar testes da API IBGE e testes E2E (Cucumber)**: Executa os testes automatizados da API IBGE e os testes end-to-end usando Cypress e Cucumber.
- **Fazer upload do Relatório Mochawesome**: Envia o relatório gerado dos testes da API e E2E como artefato do pipeline.
- **Executar teste do Maestro**: Executa os testes automatizados do aplicativo móvel `app-release.apk`.
- **Fazer upload do Relatório do Maestro**: Envia o relatório gerado dos testes móveis.
- **Instalar K6**: Instala a ferramenta K6 para execução dos testes de carga.
- **Limpar relatório anterior do K6**: Remove o relatório anterior dos testes de carga.
- **Executar teste de carga com K6**: Executa o script de teste de carga e gera um relatório JSON com os resultados.
- **Fazer upload do Relatório de Teste de Carga**: Envia o relatório gerado dos testes de carga.

### 1. Requisitos
- **Node.js**: Versão 18 ou superior.
- **Ferramentas do CI/CD**: Suporte ao GitHub Actions ou similar.
- **Dependências**: Cypress, K6, Maestro.

### 2. Instalação e Configuração

1. **Checkout do Repositório**: Clone o repositório.
2. **Configurar Node.js**: Versão 18.
3. **Instalar Dependências**: Execute `npm ci`.

### 3. Testes Automatizados

#### 3.1 Testes de Carga - K6
- **Objetivo**: Avaliar a performance.
- **Teste**: Script em `load-tests/load-test.js` simula a carga de usuários e valida a resposta.
- **Relatório**: Gera um relatório JSON com os resultados.

#### 3.2 Testes de API - IBGE
- **Objetivo**: Automatizar e validar respostas de API.
- **Arquivo de Testes**: `cypress/e2e/api-tests/ibge-api.cy.js`.
- **Relatório**: Gera relatório Mochawesome com os resultados dos testes de API.

#### 3.3 Testes End-to-End (E2E) - Cucumber
- **Objetivo**: Validar fluxos críticos usando Gherkin.
- **Arquivos de Testes**: `cypress/e2e/**/*.feature`.
- **Relatório**: Relatório Mochawesome detalhado.

#### 3.4 Testes para Aplicativos Móveis - Maestro
- **Objetivo**: Testar a usabilidade móvel.
- **Aplicativo**: `app-release.apk`.
- **Relatório**: Gera relatório detalhado dos testes móveis.

### 4. Relatórios de Testes
- **Mochawesome**: Resultados detalhados para testes de API e E2E, incluindo relatórios HTML e JSON em `cypress/reports`.
- **Maestro**: Relatórios de testes móveis em `maestro-report`.
- **K6**: Relatórios de performance da API em `load-tests`.

### 5. Execução do Pipeline
- **Branches Monitoradas**: `main`.
- **Trigger**: Push ou pull request.

### 6. Tecnologias Utilizadas
- **Node.js**, **Cypress**, **Cucumber**, **Maestro**, **K6**.

## Considerações Finais
Este pipeline visa garantir a qualidade contínua do projeto. Pode ser expandido conforme necessário para incluir mais verificações e ferramentas.

