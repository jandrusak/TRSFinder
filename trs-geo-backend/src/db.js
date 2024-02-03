const mysql = require('mysql2');

const connection = mysql.createPool({
    connectionLimit: 10,
    connectTimeout: 20000,
    acquireTimeout: 20000,
    timeout: 40000,
    host: process.env.Db_Host,
    user: process.env.DbGeo_Username,
    password: process.env.Db_Password,
    database: process.env.Db_Name,
    port: process.env.DB_PORT,
    // Add SSL options if your RDS instance requires them
    ssl: {
        // This is necessary only if your RDS instance requires SSL connections
        // ca: fs.readFileSync(__dirname + '/mysql-ca-main.crt') // Path to your RDS CA certificate
    }
});

module.exports = connection;



// let mysql = require("mysql");
// const { config } = require("dotenv");

// let connection = mysql.createPool({

//     connectionLimit : 10, // You might want to configure this based on your application's needs
//     connectTimeout  : 20000, // Increase connection timeout to 20 seconds
//     acquireTimeout  : 20000, // Increase acquire timeout to 20 seconds
//     timeout         : 40000,

//     user: process.env.DbGeo_Username, 
//     password: process.env.Db_Password, 
//     host: process.env.Db_Host,
//     port: process.env.DB_PORT, 
//     database: process.env.Db_Name

// });

// let sql = "select now();"

// connection.query(sql, function (err, results){
//     //what to do when query results come back? 
//     if(err) {
//         console.log("Running the query failed.", err);
//     }   else {
//         console.log("The query was successful. => \n", results);
//     }
// });

// module.exports = connection;
