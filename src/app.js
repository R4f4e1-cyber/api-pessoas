const express = require('express');
const logMiddleware = require('./middlewares/log.middleware');
const errorMiddleware = require('./middlewares/error.middleware');
const pessoaRoutes = require('./routes/pessoa.routes');

const app = express();

app.use(logMiddleware);
app.use(express.json());
app.use('/pessoas', pessoaRoutes);

app.use((req, res) => res.status(404).json({ erro: 'Rota não encontrada' }));
app.use(errorMiddleware);

module.exports = app;
