const { defineConfig } = require('cypress');
const createBundler = require('@bahmutov/cypress-esbuild-preprocessor');
const addCucumberPreprocessorPlugin = require('@badeball/cypress-cucumber-preprocessor').addCucumberPreprocessorPlugin;
const createEsbuildPlugin = require('@badeball/cypress-cucumber-preprocessor/esbuild').createEsbuildPlugin;

module.exports = defineConfig({
    reporter: 'allure', // Definindo o Allure como o repórter
    e2e: {
        baseUrl: process.env.TEST_TYPE === 'api' 
                 ? 'https://servicodados.ibge.gov.br/api/v1' 
                 : 'https://www.saucedemo.com', // URL base para API ou Web
        specPattern: [
            'cypress/e2e/**/*.cy.js',
            'cypress/e2e/**/*.feature'
        ],
        stepDefinitions: 'cypress/support/step_definitions',
        screenshotOnRunFailure: true,
        video: false,
        async setupNodeEvents(on, config) {
            const bundler = createBundler({
                plugins: [createEsbuildPlugin(config)],
            });

            on('file:preprocessor', bundler);
            await addCucumberPreprocessorPlugin(on, config);

            // Garantir que `env` esteja definido
            if (!config.env) {
                config.env = {};
            }

            // Configurar valores padrão para variáveis de ambiente
            config.env.apiBaseUrl = config.env.apiBaseUrl || 'https://servicodados.ibge.gov.br/api/v1';
            config.env.webBaseUrl = config.env.webBaseUrl || 'https://www.saucedemo.com';

            // Integrar o plugin do Allure
            require('@shelex/cypress-allure-plugin/writer')(on);

            return config; // Retornar o `config` atualizado
        },
    },
    env: {
        apiBaseUrl: 'https://servicodados.ibge.gov.br/api/v1',
        webBaseUrl: 'https://www.saucedemo.com'
    }
});
