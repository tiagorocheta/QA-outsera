const { defineConfig } = require('cypress');
const createBundler = require('@bahmutov/cypress-esbuild-preprocessor');
const addCucumberPreprocessorPlugin = require('@badeball/cypress-cucumber-preprocessor').addCucumberPreprocessorPlugin;
const createEsbuildPlugin = require('@badeball/cypress-cucumber-preprocessor/esbuild').createEsbuildPlugin;

module.exports = defineConfig({
    reporter: 'allure',
    e2e: {
        baseUrl: process.env.TEST_TYPE === 'api' 
                 ? 'https://servicodados.ibge.gov.br/api/v1' 
                 : 'https://www.saucedemo.com',
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

            // Garantir que `config.env` esteja sempre definido
            config.env = {
                ...config.env,
                apiBaseUrl: config.env?.apiBaseUrl || 'https://servicodados.ibge.gov.br/api/v1',
                webBaseUrl: config.env?.webBaseUrl || 'https://www.saucedemo.com',
            };

            try {
                // Integrar o plugin do Allure
                require('@shelex/cypress-allure-plugin/writer')(on);
            } catch (error) {
                console.error("Erro ao integrar o Allure plugin:", error.message);
            }

            return config; // Retornar o `config` atualizado
        },
    },
});
