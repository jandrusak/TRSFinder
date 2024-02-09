const mysql = require("mysql2");
const { config } = require("dotenv");

let connection = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DBGEO_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    // ssl: { rejectUnauthorized: false } // Add this line to disable SSL verification
    //  host: "geo-database.cmz9ee14rvtf.us-east-1.rds.amazonaws.com",
    // user: "admin",
    // password: "Jonathan#1",
    // database: "geobase",
    // port: 3306,


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















// const mysql = require('mysql');

// const connection = mysql.createPool({
//     connectionLimit: 10,
//     connectTimeout: 20000,
//     acquireTimeout: 20000,
//     timeout: 40000,
//     host: process.env.Db_Host,
//     user: process.env.DbGeo_Username,
//     password: process.env.Db_Password,
//     database: process.env.Db_Name,
//     port: process.env.DB_PORT,
//     // Add SSL options if your RDS instance requires them
//     ssl: {
//         // This is necessary only if your RDS instance requires SSL connections
//         // ca: fs.readFileSync(__dirname + '/mysql-ca-main.crt') // Path to your RDS CA certificate
//     }
// });

// module.exports = connection;



