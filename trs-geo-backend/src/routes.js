let express = require("express");
let router = express.Router();
let controller = require("./controller");

// Products controllers
router.get("/Products", controller.getAllProducts);
router.get("/Products/:id", controller.getProductById);
router.post("/Products", controller.addProducts);
router.put("/Products/:id", controller.updateProduct);

module.exports = router;