const app = require('./app');
const { PORT, JSON_SERVER_URL } = require('./config/env');

app.listen(PORT, () => {
  console.log(`API Express rodando em http://localhost:${PORT}`);
  console.log(`JSON Server configurado em ${JSON_SERVER_URL}`);
});
