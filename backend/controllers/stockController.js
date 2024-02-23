// backend/controllers/stockController.js
const pool = require('../config/db');

// Function to add or remove units of an item
exports.updateStock = async (req, res) => {
  try {
    const { itemId, quantity } = req.body;
    const item = await pool.query('SELECT stock FROM items WHERE id = $1', [itemId]);

    if (item.rows.length === 0) {
      return res.status(404).json({ message: 'Item not found' });
    }

    const newStock = item.rows[0].stock + quantity;
    if (newStock < 0) {
      return res.status(400).json({ message: 'Stock cannot be negative' });
    }

    const updatedItem = await pool.query('UPDATE items SET stock = $1 WHERE id = $2 RETURNING *', [newStock, itemId]);
    res.json(updatedItem.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Function to generate a stock report
exports.generateStockReport = async (req, res) => {
  try {
    const stockReport = await pool.query(`
    SELECT 
    COUNT(*) AS total_products,
    SUM(stock) AS total_stock,
    SUM(CASE WHEN status = 'disponível' THEN stock ELSE 0 END) AS available_stock,
    SUM(CASE WHEN status != 'disponível' THEN stock ELSE 0 END) AS unavailable_stock,
    MAX(last_updated) AS last_updated
FROM items;
    `);
    
    res.json(stockReport.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
