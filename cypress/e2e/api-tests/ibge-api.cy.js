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

    it('Deve retornar 200 quando o estado não existe', () => {
        cy.request({
            url: '/localidades/estados/999',
            failOnStatusCode: false, // Evita que o teste falhe automaticamente
        }).then((response) => {
            expect(response.status).to.eq(200); // Verifica o status de não encontrado
            expect(response.body).to.be.empty; // A API não deve retornar conteúdo para esse caso
        });
    });

    it('Deve retornar erro 200 quando o ID do estado for inválido', () => {// Devido a implantação da api, ela retorna 200 para quando nao encontrar o id especifico
        
        cy.request({
            url: '/localidades/estados/abc', // Um ID que não faz sentido
            failOnStatusCode: false,
        }).then((response) => {
            validarResposta(response); // Utilizando a função aqui
            // Adicionar validações adicionais se necessário
        });
    });
});
