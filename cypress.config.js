const { defineConfig } = require('cypress');

module.exports = defineConfig({
    reporter: 'mochawesome', // Adiciona Mochawesome como repórter
    reporterOptions: {
        reportDir: 'cypress/reports', // Diretório para os relatórios
        overwrite: false,             // Não sobrescreve relatórios antigos
        html: true,                   // Gera relatórios em HTML
        json: true,                   // Gera relatórios em JSON
    },
    e2e: {
        baseUrl: 'https://servicodados.ibge.gov.br/api/v1', // URL base da API
        specPattern: 'cypress/e2e/**/*.cy.js', // Padrão para localizar os arquivos de teste
        screenshotOnRunFailure: true, // Captura screenshots automaticamente em caso de falha
        video: false,                 // Desativa gravação de vídeo (opcional, ajustável)
        setupNodeEvents(on, config) {
            // Configurações ou plugins adicionais
            // Aqui você pode adicionar eventos personalizados, se necessário
        },
    },
});
