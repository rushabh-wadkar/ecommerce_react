const express = require("express");
const router = express.Router();
const AppController = require("../controllers/app.controller");

router.get("/products", AppController.getAllProducts);
router.get("/product/:uniq_id", AppController.getProductByUniqueID);
router.get("/data/aws/view", AppController.getDataFromAWS);
router.get("/data/aws/import", AppController.importData);

module.exports = router;
