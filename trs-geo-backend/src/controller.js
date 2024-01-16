let db = require("./db");

//USERS CONTROLLERS COMPLETED
let getAllUsers = function(req, res){
    let sql = 'select * from users'
    db.query(sql, function(err, results){
        if (err){
                console.log("failed", err);
                res.sendStatus(500);
        }   else {
                if(results.length == 0){
                    res.sendStatus(404); 
                } else {
                    res.json(results);
                }
        }
    })
};

let getUserById = function(req, res){
    let id = req.params.id;
    let sql = 'select * from users where user_id = ?'
    let params = [id]
    db.query(sql, params, function(err, results){
        if (err){
                console.log("failed", err);
                res.sendStatus(500);
        }   else {
                if(results.length == 0){
                    res.sendStatus(404); 
                } else {
                    res.json(results[0]);
                }
        }
    })
};

let deleteUsers = function(req, res){
    let id = req.params.id;
    let sql = "delete from users where user_id = ?";
    let params = [id];
    db.query(sql, params, function(err, results){
        if(err) {
            console.log("delete query failed", err); 
            res.sendStatus(500);
        }   else {
            res.sendStatus(204);
        }
})};

let updateUsers = function(req, res){
    let id = req.params.id;
    let { email, pwd, city, full_name } = req.body;

    let updates = [];
    let params = [];
    if (email!==undefined) {
        updates.push("email = ?");
        params.push(email);
    }
    if (pwd !==undefined) {
        updates.push("pwd = ?");
        params.push(pwd);
    }
    if (city!==undefined) {
        updates.push("city = ?");
        params.push(city);
    }
    if (full_name!==undefined) {
        updates.push("full_name = ?");
        params.push(full_name);
    }
    if (updates.length ===0) {
        return res.status(400).send("no fields provided for update");   
    }
    params.push(id);

    let sql = `UPDATE users SET ${updates.join(", ")} WHERE user_id = ?`;
    db.query(sql, params, function(err, results){
        if (err){
                console.log("update failed", err);
                res.sendStatus(500);
        }   else {
                if(results.affectedRows === 0){
                    res.sendStatus(404); 
                } else {
                    res.json({message: "Update Successful", results});
                }
        }
    });
};

 
//PRODUCTS CONTROLLERS
let getAllProducts = function(req, res){
    let sql = 'select * from Products'
    db.query(sql, function(err, results){
        if (err){
                console.log("failed", err);
                res.sendStatus(500);
        }   else {
                if(results.length == 0){
                    res.sendStatus(404); 
                } else {
                    res.json(results);
                }
        }
    })
};
//not needed at this time
let addProducts = function(req, res){
    let { name, address, city, type, website_address, phone } = req.body;

    if(!name || !address || !city|| !type) {
        res.status(400).json("Complete required fields: name, address, city, type"); 
        return;
    }
    let sql = "insert into Products (name, address, city, type, website_address, phone) values (?, ?, ?, ?, ?, ?)"
    let params = [name, address, city, type, website_address, phone];
    db.query(sql, params, function(err, results){
        if(err){
            console.log("Failed to insert into the database", err);
            res.sendStatus(500); 
        } else {
            res.status(201).send("employer  added succesfully");
        }
    })
};

let getProductById = function(req, res){
    let { school_id, name, address, city, type, zip, county, district_name, district_city } = req.query;
    let sql = 'select * from Products where';
    let conditions = [];
    let params = [];

    if(school_id) {
        conditions.push(" school_id = ?");
        params.push(school_id);
    }
    if(name) {
        conditions.push(" name LIKE ?");
        params.push(`%${name}%`);
    }
    if(address) {
        conditions.push(" address LIKE ?");
        params.push(`%${address}%`);
    }
    if(conditions.length===0) {
        return res.status(400).send("No search criteria provided");
    }

    sql += conditions.join(" AND ");

    db.query(sql, params, function(err, results){
        if (err){
                console.log("failed", err);
                res.sendStatus(500);
        }   else {
                if(results.length == 0){
                    res.sendStatus(404); 
                } else {
                    res.json(results[0]);
                }
        }
    })
};

let deleteProducts = function(req, res){
    let id = req.params.id;
    let sql = "delete from Products where school_id = ?";
    let params = [id];
    db.query(sql, params, function(err, results){
        if(err) {
            console.log("delete query failed", err); 
            res.status(500).send({message: "An error occured"});
        }   else {
            if (results.affectedRows === 0) {
                res.status(404).json({message: "employer not found"});
            } else {
                res.status(200).json({message: "employer deleted"});
            }
        }
})};

let updateProduct = function(req, res){
    let id = req.params.id;
    let { name, address, city, type} = req.body;
    let sql = "UPDATE Products set name = ?, address = ?, city = ?, type = ? WHERE school_id = ?";
    let params = [name, address, city, type, id];
    db.query(sql, params, function(err, results){
        if (err){
                console.log("update failed", err);
                res.sendStatus(500);
        }   else {
                if(results.affectedRows === 0){
                    res.sendStatus(204); 
                } else {
                    res.json({message: "Update Successful", results});
                }
        }
    })
};

//CARTS CONTROLLERS
let getAllCarts = function(req, res){
    let sql = 'select * from Cart'
    db.query(sql, function(err, results){
        if (err){
                console.log("failed", err);
                res.status(500).send({message: "error"});
        }   else {
                if(results.length == 0){
                    res.status(404).send({message: "Cart not found"}); 
                } else {
                   return res.json(results);
                }
        }
    })
};

//get/cart/:user_id the cart items for user by iD 
//MUST HAVE MIDDLEWARE APPLIED
let getCartByUId = function(req, res){
    let userId = req.userToken.id
    let sql = 'select * from Cart where user_id = ?'
        db.query(sql, userId, function(err, results){
        if (err){
                console.log("failed", err);
                res.sendStatus(500);
        }   else {
                if(results.length == 0){
                    res.sendStatus(404); 
                } else {
                    res.json(results);
                }
        }
    })
};
// add a product to the cart for user by its iD
// post/cart/:productId 
let addToCartByProductId = function(req, res){
    let userId = req.userToken.id;
    let productId = req.body.productId;
    let sql = "INSERT INTO Cart (user_id, school_id) VALUES (?, ?)";
    let params = [userId, productId];

    db.query(sql, params, function(err, results){
        if (err){
                console.log("insert into cart failed", err);
                res.status(500).json({message: "error"});
        }   else {
                    res.status(201).json({message: "Product added"}); 
                } 
        });
    };


//delete/cart/:userid/:productid product from cart by user id and product id 
let deleteProductFromCart = function(req, res){
    let userId = req.userToken.id;
    let productId = req.params.school_id;
    let sql = "delete from Cart where user_id = ? AND school_id = ?";
    let params = [userId, productId];

    db.query(sql, params, function(err, results){
        if(err) {
            console.log("delete query failed", err); 
            res.status(500).json({message: "An error occured"});
        }   else {
            if (results.affectedRows === 0) {
                res.status(404).json({message: "employer not found in cart"});
            } else {
                console.log("")
                res.status(200).json({message: "employer deleted from cart"});
            }
        }
})};

// MUST HAVE MIDDLEWARE APPLIED
let addProductByUId = function(req, res){
    let userId = req.userToken.id
    let { school_id } = req.body;
    
    if (!school_id){
                res.status(400).json({message: "school_id is required"});
                return;
    }
    let sql = "INSERT INTO Cart (user_id, school_id) VALUES (?, ?)";
    let params = [userId, school_id];
                db.query(sql, params, function(err, results){
                    if(err){
                        console.log("SQL Query:", sql);
                        console.log("Parameters:", params);
                        console.log("Detailed Error:", err);
                        res.status(500).json({message: "an error", errorDetail: err.message});
                     } else { 
                        res.status(201).json({message: "employer added"})
                     }
                     
                })

}

//will at some point need to specify where i want all items/products by speci

module.exports = {
    // listUsers,
    getUserById, 
    getAllUsers,
    deleteUsers, 
    updateUsers,
    
    addProducts, 
    updateProduct,
    getAllProducts,
    getProductById, 
    deleteProducts,
    deleteProductFromCart,
    // updateCartByUId, 
    getAllCarts,
    getCartByUId,
    addProductByUId,
    addToCartByProductId
};