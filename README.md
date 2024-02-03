# teste-firebase-functions

# Sobre

Neste projeto o recurso a ser criado para resolver o desafio vai ser chamar `product`. Sendo assim, temos dois casos de uso que são: `CreateProductUseCase` que cria um novo produto e persiste no **firestore** por meio do `FirestoreProductRepository`, e o `IncrementProductIdUseCase` que incrementa a propriedade `incrementedId` do produto e persiste no **firestore** também por meio do `FirestoreProductRepository`.

## Arquitetura e design

A arquitetura do projeto consiste em uma **REST api** que recebe requisições http e chama os casos de uso `CreateProductUseCase`, quando o produto é persistido com sucesso no **firestore**, o caso de uso `IncrementProductIdUseCase` é chamado via evento do próprio **firestore**.

Toda a lógica de negócio está isolada nos casos de uso respeitando o **Princípio da inversão de dependência** do **SOLID**. Os repositório que persiste dados foram implementados baseados na interface do repositório de produto respeitando também o principio cidado anteriormente.

Além do princípio da inversão de dependência, temos também o **Princípio da responsabilidade única** já que nenhuma das classes possuem mais de um motivo para mudar.

Também não existe dependência das classes de negócio para as classes de infraestrutura, ou seja, a premissa básica da **Clean Architecture** foi respeitada.

## Cobertura de testes

Boa parte do projeto está com testes unitários e de integração, porém, não possível implementar testes end-to-end utilizando a estrutura real do firebase.
Dentro dos arquivos de testes, é comum encontrar a utilização de `mocks` para simular o comportamento de classes reais do ecossistema firebase. Um outro ponto a ser observado, é que nos arquivos de teste, é comum encontrar variáveis com o prefixo `sut` que significa `System Under Test` que é uma convenção para indicar que a variável é a instância da classe que está sendo testada.

# Configuração

Para rodar o projeto é necessário ter o `node` na versão 18 ou superior e o `npm` instalados. Além disso, é necessário ter o `firebase-cli` instalado e configurado com as credenciais do projeto.

## Instalação

- Clone o projeto e faça checkout na branch `feat/solve-challenge`
- Rode o comando `npm install` para instalar as dependências do projeto
- Rode o comando `npm run serve` para rodar o projeto localmente

## Endpoints

Para criar um produto, basta fazer uma requisição `POST` para o endpoint `http://localhost:5001/superfrete-challenge/us-central1/create`

```
POST /superfrete-challenge/us-central1/create HTTP/1.1
Host: localhost:5001
Content-Type: application/json
Content-Length: 30

{
    "name": "product name"
}
```

## Testes

Para rodar os testes, basta rodar o comando `npm run test`

## Outros

- Para visualizar o banco de dados do firestore com o projeto rodando localmente, basta acessar o endereço `http://127.0.0.1:4000/`
