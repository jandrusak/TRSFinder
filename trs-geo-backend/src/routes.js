let express = require("express");
let router = express.Router();
let controller = require("./controller");

// Products controllers
router.get("/Products", controller.getAllProducts);
// router.get("/Products/:id", controller.getProductById);

module.exports = router;