// const { sign } = require("jsonwebtoken");
let jwt = require("jsonwebtoken");

let checkJWT = function (req, res, next) {
  console.log("checkJWS middleware hit");
  //if request is valid, call next()
  //if not valid, send 401 on response

  


  const jwt = require('jsonwebtoken');

  exports.checkJWT = (req, res, next) => {
      console.log("checkJWT middleware hit"); // For debugging
      // Your JWT checking logic here...
      const token = req.headers.authorization?.split(' ')[1]; // Assuming a Bearer token
      if (token) {
          jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
              if (err) {
                  return res.status(401).json({ message: "Invalid token" });
              } else {
                  req.user = decoded; // Or however you'd like to attach the user info to the request
                  next();
              }
          });
      } else {
          return res.status(401).json({ message: "Authorization token required" });
      }
  };
  
};














































































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