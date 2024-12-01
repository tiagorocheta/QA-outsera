// Função utilitária para validar respostas comuns
const validarResposta = (response, statusCode = 200) => {
    expect(response.status).to.eq(statusCode);
    expect(response.headers['content-type']).to.include('application/json');
};

describe('API IBGE - Testes de Estados', () => {
    it('Deve retornar a lista completa de estados', () => {
        cy.request('/localidades/estados').then((response) => {
            expect(response.status).to.eq(200);
            expect(response.headers['content-type']).to.include('application/json');
            expect(response.body).to.be.an('array').and.to.have.length.greaterThan(0);

            const estado = response.body[0];
            // Verifica que os campos esperados estão presentes
            expect(estado).to.have.keys(['id', 'nome', 'sigla', 'regiao']);
        });
    });
});
    it('Deve retornar os detalhes do estado de São Paulo (ID: 35)', () => {
        cy.request('/localidades/estados/35').then((response) => {
            validarResposta(response); // Utilizando a função aqui
            expect(response.body).to.include({
                id: 35,
                nome: 'São Paulo',
                sigla: 'SP',
            });
        });
    });

    it('Deve retornar 200 para um estado inexistente', () => {
        cy.request({
            url: '/localidades/estados/999',
            failOnStatusCode: false,
        }).then((response) => {
            validarResposta(response); // Utilizando a função aqui
            // Adicionar validações adicionais se necessário
        });
    });
;
