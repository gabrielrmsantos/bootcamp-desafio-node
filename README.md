# API Básica em Node

Feita utilizando [express](https://expressjs.com/pt-br/), sem nenhuma conexão com banco de dados, utiliza um array para manipular os dados na api. Para gerar os id's dos repositórios, é utilizada a biblioteca [uuidv4](https://www.npmjs.com/package/uuidv4).

Url padrão: http://localhost:3333


## Rotas da api:

Rotas | Método | Descrição | Body
--- | --- | --- | ---
/repositories | GET | Retorna todos os repositórios | -
/repositories | POST | Cria um novo repositório | `{ "title": "", "url": "", "techs": [] }`
/repositories/:id | PUT | Atualiza os dados de um repositório | `{ "title": "", "url": "", "techs": [] }`
/repositories/:id | DELETE | Remove um repositório | -
/repositories/:id/like | POST | Permite "curtir" um repositório | -


__Um repositório salvo tem a seguinte estrutura básica:__

```javascript

{
  "id": "11bf5b37-e0b8-42e0-8dcf-dc8c4aefc000",
  "title": "Example",
  "url": "https://github.com/user/example",
  "techs": [],
  "likes": 0
}

```