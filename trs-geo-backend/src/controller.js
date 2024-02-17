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
        return res.status(500).send("Internal server error");
      }
      res.json(results);
    });
  };

let addProducts = function (req, res) {
  let { name, address, city, type, website_address, phone } = req.body;

  if (!name || !address || !city || !type) {
    res.status(400).json("Complete required fields: name, address, city, type");
    return;
  }
  let sql =
    "insert into Products (name, address, city, type, website_address, phone) values (?, ?, ?, ?, ?, ?)";
  let params = [name, address, city, type, website_address, phone];
  db.query(sql, params, function (err, results) {
    if (err) {
      console.log("Failed to insert into the database", err);
      res.sendStatus(500);
    } else {
      res.status(201).send("employer  added succesfully");
    }
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

let updateProduct = function (req, res) {
  let id = req.params.id;
  let { name, address, city, type } = req.body;
  let sql =
    "UPDATE Products set name = ?, address = ?, city = ?, type = ? WHERE school_id = ?";
  let params = [name, address, city, type, id];
  db.query(sql, params, function (err, results) {
    if (err) {
      console.log("update failed", err);
      res.sendStatus(500);
    } else {
      if (results.affectedRows === 0) {
        res.sendStatus(204);
      } else {
        res.json({ message: "Update Successful", results });
      }
    }
  });
};

module.exports = {
  addProducts,
  updateProduct,
  getAllProducts,
  getProductById,
  // deleteProducts,
};
