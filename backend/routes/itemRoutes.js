// backend/routes/itemRoutes.js
const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');
const { getItemChangeHistory } = require('../controllers/itemController');
const uploadMiddleware = require('../middleware/uploadMiddleware');

// Rota para editar um item existente
router.put('/edit/:id', itemController.editItem);

// Rota para remover um item
router.delete('/:id', itemController.removeItem);

// Rota para obter todos os itens
router.get('/', itemController.getAllItems);

// Rota para obter o histórico de alterações de um item específico
router.get('/:itemId/history', getItemChangeHistory);

// Rota para obter um item específico pelo ID
router.get('/:id', itemController.getItemById);

// Rota para adicionar um novo item
router.post('/add', uploadMiddleware.single('photo'), itemController.addItem); // Alterado para 'photo'

module.exports = router;
