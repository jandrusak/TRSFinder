// const { sign } = require("jsonwebtoken");
// let jwt = require("jsonwebtoken");

// let checkJWT = function (req, res, next) {

//   //if request is valid, call next()
//   //if not valid, send 401 on response

//   let value = req.get("Authorization");
//   let signedToken;

//   if (value) {
//     let parts = value.split(" ");
//     if (parts[0] == "Bearer" && parts[1]) {
//       signedToken = parts[1];
//     } else {
//       console.log("missing jwt bearer token");
//       res.sendStatus(401);
//     }
//   }
  
//   if (signedToken) {
//     try {
//       let decodedToken = jwt.verify(signedToken, process.env.Jwt_Secret);
//       req.userToken = decodedToken;
//       console.log(decodedToken)
//       next();
//     } catch (err) {
//       console.log("failed to verify jwt", err);
//       res.sendStatus(401);
//     }
//   }
// };

// module.exports = {
//   checkJWT,
// };





























// mwauths.js
const jwt = require("jsonwebtoken");

const checkJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.substring(7, authHeader.length); // Skip "Bearer "

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        console.error("JWT verification failed:", err);
        return res.sendStatus(403); // Invalid token
      }
      req.user = decoded;
      next();
    });
  } else {
    console.log("No or invalid Authorization header provided");
    return res.sendStatus(401); // Unauthorized
  }
};

module.exports = { checkJWT };
