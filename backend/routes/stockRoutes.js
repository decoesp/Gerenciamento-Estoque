const express = require("express");
const router = express.Router();
const stockController = require("../controllers/stockController");

router.put("/update-stock", stockController.updateStock);

router.get("/stock-report", stockController.generateStockReport);


module.exports = router;
