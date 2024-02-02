let db = require("./db");
let argon = require("argon2");
let jwt = require("jsonwebtoken");

let registerUser = async function (req, res) {
  let email = req.body.email;
  let password = req.body.pwd;
  let city = req.body.city;
  let full_name = req.body.full_name;

  if (!email) {
    res.status(400).json("email is required");
    return;
  }

  let hash;
  try {
    hash = await argon.hash(password);
  } catch (err) {
    console.log("Failed to hash the password", err);
    res.sendStatus(500);
    return;
  }

    let sql = "insert into users (email, pwd, city, full_name) values (?, ?, ?, ?)";
    let params = [email, hash, city, full_name];

    db.query(sql, params, function (err, results) {
      if (err) {
        if (err) {
          console.error("Error code:", err.code);
          console.error("Error message:", err.message);
          console.error("Error stack:", err.stack);
          res.status(500).send({ message: "Failed to register a user", error: err.message });
        }
    }   else {
        res.sendStatus(204);
    }
})
};

let loginUser = function (req, res) {
  let email = req.body.email;
  let password = req.body.pwd;

  let sql = "select user_id, pwd from users where email = ?";
  let params = [email];

  db.query(sql, params, async function (err, results) {
    let storedHash;
    let storedId;
    if (err) {
      console.log("failed to fetch for user", err);
    } else if (results.length > 1) {
      console.log("Returned more than 1 user for the email", email);
    } else if (results.length == 1) {
      storedHash = results[0].pwd;
      storedId = results[0].user_id;
    } else if (results.length == 0) {
      console.log("did not find user for email", email);
    }

    try {
      let pass = await argon.verify(storedHash, password);
      if (pass) {
        let token = {
          id: storedId,
          email: email,
        };
        let signedToken = jwt.sign(token, process.env.Jwt_Secret, {expiresIn: 432000})
        res.json(signedToken);
      } else {
        res.sendStatus(401);
      }
    } catch (err) {
      console.log("failed when verifying the hash", err);
      res.sendStatus(401);
    }
  });
};

module.exports = {
  registerUser,
  loginUser,
}
