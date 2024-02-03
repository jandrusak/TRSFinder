let express = require("express");
let router = express.Router();

let controller = require("./authController");

const authsMiddleware = require("./mwauths");

const { checkJWT } = require("./mwauths");



// router.post("/register", controller.registerUser); 
router.post('/register', (req, res) => {
    // Return a static JSON response without attempting any database operation
    res.json({ message: 'Register route is accessible', success: true });
  });
  



router.post("/login", controller.loginUser);

module.exports = router; 