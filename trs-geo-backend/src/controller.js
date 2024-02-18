let db = require("./db");

//PRODUCTS CONTROLLERS
let getAllProducts = function (req, res) {
    let search = req.query.search || '';
    let sql = `SELECT * FROM Products WHERE
                city LIKE ? OR 
                county LIKE ? OR 
                zip LIKE ? OR 
                district_name LIKE ?`;
    let searchPattern = `%${search}%`;
  
    db.query(sql, [searchPattern, searchPattern, searchPattern, searchPattern], (err, results) => {
      if (err) {
        console.error("Failed to execute query:", err);
        return res.status(500).json({
          message: "Internal server error",
          error: err.message,
          sqlState: err.sqlState,
      });
      }
      res.json(results);
    });
  };

let getProductById = function (req, res) {
  let {
    school_id,
    name,
    address,
    city,
    type,
    zip,
    county,
    district_name,
    district_city,
  } = req.query;
  let sql = "select * from Products where";
  let conditions = [];
  let params = [];

  if (school_id) {
    conditions.push(" school_id = ?");
    params.push(school_id);
  }
  if (name) {
    conditions.push(" name LIKE ?");
    params.push(`%${name}%`);
  }
  if (address) {
    conditions.push(" address LIKE ?");
    params.push(`%${address}%`);
  }
  if (conditions.length === 0) {
    return res.status(400).send("No search criteria provided");
  }

  sql += conditions.join(" AND ");

  db.query(sql, params, function (err, results) {
    if (err) {
      console.log("failed", err);
      res.sendStatus(500);
    } else {
      if (results.length == 0) {
        res.sendStatus(404);
      } else {
        res.json(results[0]);
      }
    }
  });
};

module.exports = {
  getAllProducts,
  getProductById,
};
