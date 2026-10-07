function erroHTTP(status, mensagem) {
  const erro = new Error(mensagem);
  erro.status = status;
  return erro;
}

module.exports = erroHTTP;
