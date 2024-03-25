const express = require("express");
const app = express();
const cors = require("cors");

const PORT = process.env.PORT || 5000;

const {
  createItemsTable,
  createItemHistoryTable,
} = require("./controllers/itemController");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("uploads"));

const itemRoutes = require("./routes/itemRoutes");
const stockRoutes = require("./routes/stockRoutes");
app.use("/items", itemRoutes);
app.use("/stock", stockRoutes);

async function initialize() {
  try {
    await createItemsTable();

    await createItemHistoryTable();

    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (error) {
    console.error("Error initializing server:", error.message);
    process.exit(1); 
  }
}


initialize();
