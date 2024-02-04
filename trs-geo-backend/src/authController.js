let db = require("../src/db");
let argon = require("argon2");
let jwt = require("jsonwebtoken");
const router = require("./routes");

let registerUser = async function (req, res) {
  console.log("Request Body:", req.body); // Log the request body
  let { email, pwd: password, city, full_name } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "email and password are required" });
  }

  try {
    let hash = await argon.hash(password);
    let sql =
      "INSERT INTO users (email, pwd, city, full_name) values (?, ?, ?, ?)";
    let params = [email, hash, city, full_name];

    db.query(sql, params, function (err, results) {
      if (err) {
        console.error("Database error:", err);
        return res
          .status(500)
          .json({
            message: "Failed to register user due to an internal error",
          });
      }
      res
        .status(201)
        .json({
          message: "User registered successfully",
          email,
          hash,
          city,
          full_name,
        });
    });
  } catch (err) {
    console.log("Error during database interaction", err.response.data);
    return res
      .sendStatus(500)
      .json({ message: "Internal server error during database interaction" });
  }
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
        let signedToken = jwt.sign(token, process.env.Jwt_Secret, {
          expiresIn: 432000,
        });
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
};
