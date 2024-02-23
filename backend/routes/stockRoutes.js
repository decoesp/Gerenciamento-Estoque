// backend/routes/stockRoutes.js
const express = require('express');
const router = express.Router();
const stockController = require('../controllers/stockController');

// Rota para atualizar o estoque de um item
router.put('/update-stock', stockController.updateStock);

// Rota para gerar um relatório de estoque
router.get('/stock-report', stockController.generateStockReport);

// Adicione outras rotas relacionadas ao controle de estoque conforme necessário...

module.exports = router;
