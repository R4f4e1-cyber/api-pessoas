function idadeMiddleware(req, res, next) {
  const idade = req.body?.idade;

  if (typeof idade !== 'number' || !Number.isFinite(idade) || idade < 0 || idade > 120) {
    return res.status(400).json({ erro: 'A idade deve estar entre 0 e 120 anos.' });
  }

  next();
}

module.exports = idadeMiddleware;
