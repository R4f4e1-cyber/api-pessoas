function logMiddleware(req, res, next) {
  const agora = new Date().toLocaleString('sv-SE', { hour12: false });
  console.log(`[${agora}] ${req.method} ${req.originalUrl}`);
  next();
}

module.exports = logMiddleware;
