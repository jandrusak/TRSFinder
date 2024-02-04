let express = require("express"); 

let router = express.Router();

let controller = require("../src/authController");

const authsMiddleware = require("./mwauths");


router.post("/register", controller.registerUser); 


router.post("/login", controller.loginUser);

module.exports = router; 


















// let express = require("express");
// let router = express.Router();

// let controller = require("./authController");

// const authsMiddleware = require("./mwauths");

// const { checkJWT } = require("./mwauths");



// router.post("/register", controller.registerUser); 




// router.post("/login", controller.loginUser);

// module.exports = router; 