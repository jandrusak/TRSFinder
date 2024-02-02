let mysql = require("mysql");
const { config } = require("dotenv");

let connection = mysql.createPool({

    connectionLimit : 10, // You might want to configure this based on your application's needs
    connectTimeout  : 20000, // Increase connection timeout to 20 seconds
    acquireTimeout  : 20000, // Increase acquire timeout to 20 seconds
    timeout         : 40000,

    user: process.env.DbGeo_Username, 
    password: process.env.Db_Password, 
    host: process.env.Db_Host,
    port: process.env.DB_PORT, 
    database: process.env.Db_Name

});

let sql = "select now();"

connection.query(sql, function (err, results){
    //what to do when query results come back? 
    if(err) {
        console.log("Running the query failed.", err);
    }   else {
        console.log("The query was successful. => \n", results);
    }
});

module.exports = connection;