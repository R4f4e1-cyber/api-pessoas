const axios = require('axios');
const { JSON_SERVER_URL } = require('../config/env');

const jsonServer = axios.create({ baseURL: JSON_SERVER_URL, timeout: 5000 });

async function listar() {
  const resposta = await jsonServer.get('/pessoas');
  return resposta.data;
}

async function buscar(id) {
  const resposta = await jsonServer.get(`/pessoas/${id}`);
  return resposta.data;
}

async function cadastrar(pessoa) {
  const resposta = await jsonServer.post('/pessoas', pessoa);
  return resposta.data;
}

async function atualizar(id, pessoa) {
  const resposta = await jsonServer.put(`/pessoas/${id}`, pessoa);
  return resposta.data;
}

async function excluir(id) {
  await jsonServer.delete(`/pessoas/${id}`);
}

module.exports = { listar, buscar, cadastrar, atualizar, excluir };
