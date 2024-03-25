const pool = require("../config/db");
const Item = require("../models/Item");
const { validationResult } = require("express-validator");

exports.addItem = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, description, supplier, category, stock } = req.body;
    const photo = req.file; 

    if (!name || !description || !supplier || !category || !stock || !photo) {
      return res
        .status(400)
        .json({ error: "Todos os campos são obrigatórios" });
    }

    const newItem = await pool.query(
      "INSERT INTO items (photo, name, description, supplier, category, stock, status) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
      [
        photo.filename,
        name,
        description,
        supplier,
        category,
        stock,
        "disponível",
      ],
    );

    res.json(newItem.rows[0]); 
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

exports.createItemsTable = async () => {
  try {
    const checkTableQuery = `SELECT to_regclass('public.items')`;
    const checkTableResult = await pool.query(checkTableQuery);

    if (checkTableResult.rows[0].to_regclass) {
      console.log("Items table already exists");
      return; 
    }

    const createTableQuery = `
      CREATE TABLE items (
        id SERIAL PRIMARY KEY,
        photo VARCHAR(255),
        name VARCHAR(255) UNIQUE,
        description TEXT,
        supplier VARCHAR(255),
        category VARCHAR(255),
        status VARCHAR(50),
        stock INTEGER,
        last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    await pool.query(createTableQuery);
    console.log("Items table created successfully.");
  } catch (error) {
    console.error('Error creating table "items":', error.message);
    throw error;
  }
};

exports.createItemHistoryTable = async () => {
  try {
    const checkTableQuery = `SELECT to_regclass('public.item_history')`;
    const checkTableResult = await pool.query(checkTableQuery);

    if (checkTableResult.rows[0].to_regclass) {
      console.log("Item history table already exists");
      return; 
    }

    const createTableQuery = `
      CREATE TABLE item_history (
        id SERIAL PRIMARY KEY,
        itemId INTEGER REFERENCES items(id),
        timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        changes TEXT
      )
    `;

    await pool.query(createTableQuery);
    console.log("Item history table created successfully.");
  } catch (error) {
    console.error('Error creating table "item_history":', error.message);
    throw error;
  }
};

exports.editItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { stock, status } = req.body; 

    const currentItemQuery = "SELECT * FROM items WHERE id = $1";
    const currentItemResult = await pool.query(currentItemQuery, [id]);
    const currentItem = currentItemResult.rows[0];

    const updatedStock = stock !== undefined ? stock : currentItem.stock;
    const updatedStatus = status !== undefined ? status : currentItem.status;

    if (
      (stock !== undefined && stock !== currentItem.stock) ||
      (status !== undefined && status !== currentItem.status)
    ) {
      const updatedItem = await pool.query(
        "UPDATE items SET stock = $1, status = $2, last_updated = CURRENT_TIMESTAMP WHERE id = $3 RETURNING *",
        [updatedStock, updatedStatus, id],
      );

      let changes = "";
      if (stock !== undefined && stock !== currentItem.stock) {
        changes += `Stock updated from ${currentItem.stock} to ${stock}. `;
      }
      if (status !== undefined && status !== currentItem.status) {
        changes += `Status updated from ${currentItem.status} to ${status}. `;
      }

      await pool.query(
        "INSERT INTO item_history (itemId, changes) VALUES ($1, $2)",
        [id, changes.trim()],
      );

      res.json(updatedItem.rows[0]);
    } else {
      res.json(currentItem);
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

exports.removeItem = async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM items WHERE id = $1", [id]);
    res.json({ message: "Item removed successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

exports.getAllItems = async (req, res) => {
  try {
    const allItems = await pool.query("SELECT * FROM items");
    res.json(allItems.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

exports.getItemChangeHistory = async (req, res) => {
  try {
    const { itemId } = req.params;

    const itemExistsQuery = "SELECT EXISTS (SELECT 1 FROM items WHERE id = $1)";
    const itemExistsResult = await pool.query(itemExistsQuery, [itemId]);

    if (!itemExistsResult.rows[0].exists) {
      return res.status(404).json({ message: "Item not found" });
    }

    const historyQuery =
      "SELECT timestamp, changes FROM item_history WHERE itemId = $1";
    const historyResult = await pool.query(historyQuery, [itemId]);

    res.json(historyResult.rows);
  } catch (error) {
    console.error("Error fetching item change history:", error.message);
    res.status(500).send("Server error");
  }
};

exports.getItemById = async (req, res) => {
  try {
    const { id } = req.params;
    const itemQuery = "SELECT *, photo FROM items WHERE id = $1";
    const itemResult = await pool.query(itemQuery, [id]);
    const item = itemResult.rows[0];
    res.json(item);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
