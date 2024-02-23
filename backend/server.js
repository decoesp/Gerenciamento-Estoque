// backend/server.js
const express = require('express');
const app = express();
const cors = require('cors');

const PORT = process.env.PORT || 5000;

// Importe as funções para criar as tabelas
const { createItemsTable, createItemHistoryTable } = require('./controllers/itemController');

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('uploads'));

// Rotas
const itemRoutes = require('./routes/itemRoutes');
const stockRoutes = require('./routes/stockRoutes');
app.use('/items', itemRoutes);
app.use('/stock', stockRoutes);

// Chama as funções para criar as tabelas dentro de um bloco try...catch
async function initialize() {
  try {
    await createItemsTable();
    
    await createItemHistoryTable();

    // Inicie o servidor após a criação das tabelas
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (error) {
    console.error('Error initializing server:', error.message);
    process.exit(1); // Encerre o processo em caso de erro
  }
}

// Chame a função de inicialização
initialize();
