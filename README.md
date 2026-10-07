# API de Pessoas

Trabalho prático de uma API REST para cadastro de pessoas, usando Node.js, Express.js e JSON Server.
O Express recebe as requisições, valida os dados e chama o JSON Server para salvar ou consultar os registros no `db.json`.

## Requisitos

- Node.js 18 ou mais recente
- npm
- REST Client do VS Code, Postman ou Insomnia para testar

## Instalação e execução

Na pasta do projeto, execute:

```bash
npm install
```

Abra dois terminais. No primeiro, inicie o JSON Server:

```bash
npm run db
```

No segundo, inicie o Express:

```bash
npm start
```

O JSON Server usa `http://localhost:3001` e o Express usa `http://localhost:3000`.
Para conferir, abra `http://localhost:3000/pessoas`.

## Rotas

| Método | Caminho | Operação | Resposta normal |
| --- | --- | --- | --- |
| GET | `/pessoas` | Listar pessoas | 200 |
| GET | `/pessoas/:id` | Buscar pelo ID | 200 / 404 |
| POST | `/pessoas` | Cadastrar | 201 / 400 |
| PUT | `/pessoas/:id` | Atualizar | 200 / 400 / 404 |
| DELETE | `/pessoas/:id` | Excluir | 204 / 404 |

## Validações

O cadastro e a atualização exigem `nome`, `idade` e `email`.
O nome não pode ser vazio, e o e-mail deve ter um formato válido.
A idade precisa ser um número entre 0 e 120, inclusive. Essa verificação é feita pelo
`idade.middleware.js` nas rotas POST e PUT, antes de chegar ao controller.
Valores inválidos retornam 400; pessoas não encontradas retornam 404.

## Filtros

Os filtros são aplicados no Express depois da consulta ao JSON Server:

- `GET /pessoas?idade=25`: idade exata
- `GET /pessoas?idadeMin=18`: idade mínima
- `GET /pessoas?idadeMax=30`: idade máxima
- `GET /pessoas?idadeMin=18&idadeMax=30`: intervalo de idade

## Organização

- `src/routes/`: rotas da API
- `src/controllers/`: validação do nome e e-mail, operações e filtros
- `src/services/`: comunicação HTTP com o JSON Server
- `src/middlewares/`: validação de idade, log e tratamento de erros
- `src/config/`: configuração das portas e endereços
- `src/app.js` e `src/server.js`: configuração e inicialização do Express

O middleware de log é global e mostra data/hora, método e endereço da requisição no terminal.
O middleware de erros retorna os status 400, 404 e 500 conforme o caso.

## Testes realizados

O arquivo [`requisicoes.http`](requisicoes.http) contém exemplos para executar pelo REST Client.
As capturas de tela dos testes estão separadas por assunto na pasta [`evidencias`](evidencias/README.md):
CRUD, validações, filtros e código/middlewares.

Os registros do `db.json` foram restaurados para os três cadastros iniciais depois dos testes.
Por isso, as capturas feitas durante os testes podem mostrar mais pessoas.
O POST e o DELETE alteram os dados; confira o ID antes de executar as exclusões.

## Publicação no GitHub

Crie um repositório vazio no GitHub e execute estes comandos dentro da pasta `api-pessoas`:

```bash
git init
git add .
git commit -m "Entrega da API de pessoas"
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/api-pessoas.git
git push -u origin main
```

Troque `SEU_USUARIO` pelo nome do seu usuário no GitHub. O repositório inclui
os arquivos do projeto e os prints; a pasta `node_modules` não deve ser enviada.
