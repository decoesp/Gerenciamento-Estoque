const express = require("express");
const router = express.Router();
const itemController = require("../controllers/itemController");
const { getItemChangeHistory } = require("../controllers/itemController");
const uploadMiddleware = require("../middleware/uploadMiddleware");

router.put("/edit/:id", itemController.editItem);

router.delete("/:id", itemController.removeItem);

router.get("/", itemController.getAllItems);

router.get("/:itemId/history", getItemChangeHistory);

router.get("/:id", itemController.getItemById);

router.post("/add", uploadMiddleware.single("photo"), itemController.addItem); 

module.exports = router;
