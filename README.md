# CI/CD Pipeline para Testes Automatizados - Outsera

Este projeto contém um pipeline CI/CD configurado para executar testes automatizados utilizando várias ferramentas e frameworks, com foco em garantir a qualidade do código e validação contínua. O objetivo é garantir que os testes sejam realizados de maneira eficiente em todas as etapas do desenvolvimento, desde testes de API até testes E2E e testes de carga. Abaixo, você encontrará um resumo dos principais componentes e etapas.

## Estrutura do Pipeline

### 1. Instalação e Configuração

- **Fazer checkout do repositório**: Clona o repositório para o ambiente CI/CD, garantindo que a versão mais recente dos arquivos esteja disponível.
- **Configurar Node.js**: Configura a versão 16 do Node.js para garantir compatibilidade com as dependências do projeto.
- **Instalar dependências**: Instala todas as dependências listadas no `package.json`.
- **Reinstalar dependências para a plataforma**: Remove a pasta `node_modules` e reinstala as dependências para garantir que tudo esteja corretamente configurado para a plataforma usada no CI/CD.

### 2. Testes Automatizados

#### Testes de API - IBGE
- **Executar testes da API IBGE**: Usa o Cypress para testar os endpoints da API do IBGE, garantindo que os dados estejam corretos e que as respostas dos endpoints sejam como esperado.
- **Gerar Relatório Allure**: Gera um relatório detalhado dos resultados dos testes da API usando o Allure, facilitando a visualização dos resultados.
- **Fazer upload do Relatório Allure**: O relatório gerado é enviado como um artefato do pipeline, permitindo download e análise posterior.

#### Testes de Aplicativo Móvel - Maestro
- **Instalar CLI do Maestro**: Instala o Maestro CLI para executar testes em um aplicativo Android.
- **Executar teste do Maestro**: Executa o teste para o aplicativo `app-release.apk`, garantindo que os principais fluxos de navegação do app estejam funcionando corretamente.
- **Fazer upload do Relatório do Maestro**: Se o relatório for gerado com sucesso, ele é enviado como um artefato para análise.

#### Testes End-to-End (E2E) - Cucumber
- **Instalar Preprocessador Cucumber**: Instala o preprocessador do Cucumber para integrar testes em formato Gherkin no Cypress.
- **Instalar dependências adicionais**: Instala pacotes como `libgbm-dev`, `libgtk-3-0` e `xvfb` para suportar a execução de testes gráficos em ambientes de CI/CD.
- **Executar testes E2E (Cucumber)**: Usa o Cypress junto com o Cucumber para executar testes E2E. Os testes incluem ações como login, navegação e validações importantes para garantir a estabilidade do fluxo do usuário.
- **Gerar Relatório Allure para Testes E2E**: Gera um relatório detalhado dos resultados dos testes E2E.
- **Fazer upload do Relatório Allure para Testes E2E**: O relatório gerado é enviado como um artefato para acompanhamento da qualidade do sistema.

#### Testes de Carga - K6
- **Criar teste de carga**: O script de teste de carga está localizado no diretório `load-tests/load-test.js`. Ele simula 500 usuários simultâneos acessando a API pública `https://jsonplaceholder.typicode.com/posts/1` por um período de 5 minutos.
- **Executar teste de carga com K6**: Durante o pipeline, o teste de carga é executado para garantir que a API seja capaz de lidar com grandes volumes de requisições de forma estável.
- **Fazer upload do Relatório de Teste de Carga**: O relatório gerado é enviado como um artefato do pipeline, permitindo análise detalhada sobre a performance da API.

## Como Executar o Pipeline

O pipeline é acionado automaticamente em determinadas situações, incluindo:
- **Push** para as branches `main`, `ci-pipeline`, `testes-automatizados` e `maestro`.
- **Pull request** direcionado à branch `main`.

## Tecnologias Utilizadas
- **Node.js**: Utilizado para gerenciar dependências e scripts de automação.
- **Cypress**: Framework utilizado para testes de API e testes E2E.
- **Cucumber**: Para testes em Gherkin, garantindo que os fluxos do sistema sigam os requisitos especificados.
- **Allure**: Ferramenta de relatórios que facilita a análise dos resultados dos testes automatizados.
- **Maestro**: Usado para automação de testes em aplicativos móveis Android.
- **K6**: Utilizado para simular testes de carga e garantir a performance das APIs.

## Como Verificar os Relatórios
Os relatórios gerados pelo Allure, Maestro e K6 são carregados como artefatos no GitHub Actions e podem ser baixados e analisados para obter detalhes sobre cada etapa do teste, incluindo sucessos, falhas e capturas de tela de erros.

## Considerações Finais
Este pipeline foi desenvolvido para garantir a qualidade contínua do projeto, integrando diferentes tipos de testes automatizados. Ele pode ser expandido conforme necessário para incluir mais verificações ou ferramentas que ajudem a manter a qualidade do produto.

