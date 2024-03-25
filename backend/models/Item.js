const pool = require("../config/db");

class Item {
  constructor(itemData) {
    this.itemData = itemData;
  }

  async addItem() {
    try {
      const { photo, name, description, supplier, category, status, stock } =
        this.itemData;
      const newItem = await pool.query(
        "INSERT INTO items (photo, name, description, supplier, category, status, stock) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
        [photo, name, description, supplier, category, status, stock],
      );
      return newItem.rows[0];
    } catch (err) {
      console.error(err.message);
      throw new Error("Error adding item");
    }
  }

  async editItem(itemId) {
    try {
      const { photo, name, description, supplier, category, status, stock } =
        this.itemData;
      const updatedItem = await pool.query(
        "UPDATE items SET photo = $1, name = $2, description = $3, supplier = $4, category = $5, status = $6, stock = $7 WHERE id = $8 RETURNING *",
        [photo, name, description, supplier, category, status, stock, itemId],
      );
      return updatedItem.rows[0];
    } catch (err) {
      console.error(err.message);
      throw new Error("Error editing item");
    }
  }

  async removeItem(itemId) {
    try {
      await pool.query("DELETE FROM items WHERE id = $1", [itemId]);
    } catch (err) {
      console.error(err.message);
      throw new Error("Error removing item");
    }
  }

  async getAllItems() {
    try {
      const allItems = await pool.query("SELECT * FROM items");
      return allItems.rows;
    } catch (err) {
      console.error(err.message);
      throw new Error("Error getting all items");
    }
  }

  async findById(itemId) {
    try {
      const item = await pool.query("SELECT * FROM items WHERE id = $1", [
        itemId,
      ]);
      return item.rows[0];
    } catch (err) {
      console.error(err.message);
      throw new Error("Error fetching item by ID");
    }
  }
}

module.exports = new Item();
