const { defineConfig } = require('cypress');
const createBundler = require('@bahmutov/cypress-esbuild-preprocessor');
const addCucumberPreprocessorPlugin = require('@badeball/cypress-cucumber-preprocessor').addCucumberPreprocessorPlugin;
const createEsbuildPlugin = require('@badeball/cypress-cucumber-preprocessor/esbuild').createEsbuildPlugin;

module.exports = defineConfig({
    reporter: 'mochawesome', // Adiciona Mochawesome como repórter
    reporterOptions: {
        reportDir: 'cypress/reports', // Diretório para os relatórios
        overwrite: false,             // Não sobrescreve relatórios antigos
        html: true,                   // Gera relatórios em HTML
        json: true,                   // Gera relatórios em JSON
    },
    e2e: {
        baseUrl: 'https://www.saucedemo.com', // URL base para os testes web
        specPattern: [
            'cypress/e2e/**/*.cy.js',  // Inclui os testes existentes
            'cypress/e2e/**/*.feature' // Inclui os novos testes Gherkin
        ],
        stepDefinitions: 'cypress/support/step_definitions', // Define o caminho para os Step Definitions
        screenshotOnRunFailure: true, // Captura screenshots automaticamente em caso de falha
        video: false,                 // Desativa gravação de vídeo (opcional, ajustável)
        async setupNodeEvents(on, config) {
            // Configurações para suportar o Cucumber com o bundler ESBuild
            const bundler = createBundler({
                plugins: [createEsbuildPlugin(config)],
            });

            on('file:preprocessor', bundler);
            await addCucumberPreprocessorPlugin(on, config);

            return config;
        },
    },
    env: {
        apiBaseUrl: 'https://servicodados.ibge.gov.br/api/v1', // URL para os testes de API
        webBaseUrl: 'https://www.saucedemo.com' // URL para os testes web
    }
});
