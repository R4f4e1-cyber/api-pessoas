# Evidências dos testes

As imagens foram capturadas durante a execução do projeto no VS Code.

| Pasta | O que mostra |
| --- | --- |
| `01-crud/` | Listagem, busca, cadastro, atualização, exclusão e respostas 404 |
| `02-validacoes/` | Testes rejeitados com status 400 (idade, nome e e-mail) |
| `03-filtros/` | Idade exata, mínima, máxima e intervalo |
| `04-codigo-e-logs/` | Código do middleware de idade, rotas POST/PUT e logs no terminal |

Na exclusão, o arquivo `01-crud/07-excluir-pessoa-204.png` apresenta a resposta `204 No Content`.
As imagens mostram o estado do banco durante os testes; o `db.json` do projeto foi
restaurado para os três registros originais depois deles.
