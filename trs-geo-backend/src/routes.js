let express = require("express");

let router = express.Router();

let controller = require("./controller");

let authsMiddleware = require("./mwauths")


//users controllers:
router.get("/users", controller.getAllUsers);

router.get("/users/:id", controller.getUserById);

router.delete("/users/:id", controller.deleteUsers);

router.put("/users/:id", controller.updateUsers);



//products controllers: check the file locations
router.get("/Products", controller.getAllProducts);

router.get("/Products/:id", controller.getProductById);

router.post("/Products", controller.addProducts);

router.put("/Products/:id", controller.updateProduct);

// router.delete("/Products/:id", controller.deleteProducts);

module.exports = router;