const pessoaService = require('../services/pessoa.service');
const erroHTTP = require('../utils/erroHTTP');

function extrairId(req) {
  const { id } = req.params;
  if (!/^[1-9]\d*$/.test(id)) {
    throw erroHTTP(400, 'O ID deve ser um número inteiro positivo.');
  }
  return id;
}

function validarDadosPessoa(body = {}) {
  const { nome, idade, email } = body;

  if (typeof nome !== 'string' || !nome.trim()) {
    throw erroHTTP(400, 'O nome é obrigatório e não pode estar vazio.');
  }

  if (typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    throw erroHTTP(400, 'O e-mail é obrigatório e deve ter formato válido.');
  }

  return { nome: nome.trim(), idade, email: email.trim() };
}

function lerFiltro(valor, nome) {
  if (valor === undefined) return null;
  if (typeof valor !== 'string' || valor.trim() === '' || !Number.isFinite(Number(valor))) {
    throw erroHTTP(400, `O filtro ${nome} deve ser um número válido.`);
  }
  return Number(valor);
}

async function listar(req, res) {
  const idade = lerFiltro(req.query.idade, 'idade');
  const idadeMin = lerFiltro(req.query.idadeMin, 'idadeMin');
  const idadeMax = lerFiltro(req.query.idadeMax, 'idadeMax');

  const pessoas = await pessoaService.listar();
  const filtradas = pessoas.filter((pessoa) =>
    (idade === null || pessoa.idade === idade) &&
    (idadeMin === null || pessoa.idade >= idadeMin) &&
    (idadeMax === null || pessoa.idade <= idadeMax)
  );

  return res.status(200).json(filtradas);
}

async function buscar(req, res) {
  const pessoa = await pessoaService.buscar(extrairId(req));
  return res.status(200).json(pessoa);
}

async function cadastrar(req, res) {
  const dados = validarDadosPessoa(req.body);
  const criada = await pessoaService.cadastrar(dados);
  return res.status(201).json(criada);
}

async function atualizar(req, res) {
  const id = extrairId(req);
  const dados = validarDadosPessoa(req.body);
  await pessoaService.buscar(id);
  const atualizada = await pessoaService.atualizar(id, dados);
  return res.status(200).json(atualizada);
}

async function excluir(req, res) {
  const id = extrairId(req);
  await pessoaService.buscar(id);
  await pessoaService.excluir(id);
  return res.status(204).send();
}

module.exports = { listar, buscar, cadastrar, atualizar, excluir };
