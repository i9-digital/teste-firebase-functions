# API REST NODE, TYPESCRIPT, E FIREBASE

API de cadastro de usuários com Firebase, Node.js e Typescript.

## Descrição

O objetivo desse projeto é para fins de um processo seletivo da empresa SuperFrete.
Esta API foi desenvolvida em Node.js com o framework Express que utiliza o Firebase para cadastrar usuários no Firestore. o projeto foi desenvolvido com base no design SOLID, onde as camadas de controller, service e repository foram feitas com classes, interfaces e injeção de dependencias. O projeto contém teste automatizado e unitário.

## Como usar

### Pré-requisitos

Antes de executar a aplicação, você deve ter as seguintes ferramentas instaladas em seu ambiente de desenvolvimento:

- Node.js
- Firebase CLI

### Instalação

1. Clone este repositório em seu computador `git clone https://github.com/i9-digital/teste-firebase-functions.git`
2. Instale as dependências executando o comando `npm install`

### Variáveis de ambiente

Crie um arquivo na raiz do projeto com o nome `.env`,
Esta aplicação contém as seguintes variáveis de ambiente:

`# APP`
- `NODE_ENV`
- `LOGGER_LEVEL`
- `LOGSTASH_ENABLED`
- `APPLICATION_NAME`
- `PORT`

### Conexão com o Firebase

Para conectar a aplicação ao seu projeto do Firebase, execute os seguintes passos:

1. Acesse o console do Firebase em https://console.firebase.google.com/
2. Crie um novo projeto ou selecione um projeto existente
3. Clique no botão "Visão geral do projeto" e depois "Configurações do projeto"
4. Clique em "Contas de serviço" e depois "gerar nova chave privada"
5. adicione as credenciais no arquivo `credentials-firebase.json` da raiz do projeto

### Execução

Para executar a aplicação em desenvolvimento:

```bash
npm run start:dev
```

Para executar a aplicação em produção:

```bash
npm run build
```

```bash
npm run start:prod
```

### Exemplos de uso
A API suporta a seguinte operação:

- `POST /users`:
- curl -X 'POST' \
    'http://localhost:8080/users' \
    -H 'accept: application/json' \
    -H 'Content-Type: application/json' \
    -d '{
    "name": "Carlos Felipe"
  }'

### Swagger do projeto

`http://localhost:8080/documentation`


### Tecnologias usadas
- Node.js
- Typescript
- Express
- Firebase
- Dotenv
- Solid