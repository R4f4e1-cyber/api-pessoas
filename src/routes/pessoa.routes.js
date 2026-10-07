const express = require('express');
const controller = require('../controllers/pessoa.controller');
const idadeMiddleware = require('../middlewares/idade.middleware');

const router = express.Router();
const asyncHandler = (funcao) => (req, res, next) =>
  Promise.resolve(funcao(req, res, next)).catch(next);

router.get('/', asyncHandler(controller.listar));
router.get('/:id', asyncHandler(controller.buscar));
router.post('/', idadeMiddleware, asyncHandler(controller.cadastrar));
router.put('/:id', idadeMiddleware, asyncHandler(controller.atualizar));
router.delete('/:id', asyncHandler(controller.excluir));

module.exports = router;
