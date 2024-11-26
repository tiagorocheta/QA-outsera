// Função para validar partes comuns das respostas da API
const validarResposta = (response, statusCode = 200) => {
    expect(response.status).to.eq(statusCode);
    expect(response.headers['content-type']).to.include('application/json');
};

describe('API IBGE - Testes de Estados', () => {
    it('Deve retornar todos os estados disponíveis', () => {
        cy.request('/localidades/estados').then((response) => {
            validarResposta(response); // Valida o status e os headers
            expect(response.body).to.be.an('array').and.to.have.length.greaterThan(0);

            const estado = response.body[0];
            // Verifica se os campos básicos do estado estão no retorno
            expect(estado).to.have.keys(['id', 'nome', 'sigla', 'regiao']);
        });
    });

    it('Deve retornar os detalhes do estado de São Paulo (ID: 35)', () => {
        cy.request('/localidades/estados/35').then((response) => {
            validarResposta(response); // Mesma validação básica
            expect(response.body).to.include({
                id: 35,
                nome: 'São Paulo',
                sigla: 'SP',
            });
        });
    });

    it('Deve retornar 200 para um estado inexistente', () => {
        // Devido à implementação da API, mesmo para estados inexistentes, o retorno é 200.
        // Verificamos que o corpo da resposta está vazio.
        cy.request({
            url: '/localidades/estados/999',
            failOnStatusCode: false, // Evita que o teste falhe automaticamente
        }).then((response) => {
            expect(response.status).to.eq(200); // Limitação da API
            expect(response.body).to.be.empty; // Garante que o corpo não contém dados inesperados
        });
    });

    it('Deve retornar 200 quando o ID do estado for inválido', () => {
        // Devido à implementação da API, um status 200 é retornado mesmo para IDs inválidos.
        // Verificamos que o corpo da resposta está vazio ou contém informações esperadas.
        cy.request({
            url: '/localidades/estados/abc', // Um ID que não faz sentido
            failOnStatusCode: false,
        }).then((response) => {
            validarResposta(response); // Valida status 200 e headers comuns
            expect(response.body).to.be.empty; // Garante que a resposta está vazia
        });
    });
});
