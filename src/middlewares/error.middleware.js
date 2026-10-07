function errorMiddleware(erro, req, res, next) {
  if (res.headersSent) return next(erro);

  if (erro.type === 'entity.parse.failed') {
    return res.status(400).json({ erro: 'O corpo da requisição contém JSON inválido.' });
  }

  if (erro.status === 400) {
    return res.status(400).json({ erro: erro.message });
  }

  if (erro.response?.status === 404 || erro.status === 404) {
    return res.status(404).json({ erro: 'Pessoa não encontrada' });
  }

  console.error('Erro da API:', erro.message);
  return res.status(500).json({ erro: 'Erro interno ou falha na comunicação com o JSON Server.' });
}

module.exports = errorMiddleware;
