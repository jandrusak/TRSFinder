let express = require("express");
let router = express.Router();

let controller = require("./authController");
const { checkJWT } = require("./mwauths");

const authsMiddleware = require("./mwauths");



router.post("/register", controller.registerUser); 


router.post("/login", controller.loginUser);

module.exports = router; 