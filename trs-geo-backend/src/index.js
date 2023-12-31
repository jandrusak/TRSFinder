const express = require('express')
const app = express();
let cors = require("cors");
require("dotenv").config();


app.use(cors())
app.use(express.json());

//importing routes
let routes = require("./routes");
app.use(routes);

let authRoutes = require("./authRoutes");
app.use(authRoutes);

//database connection
const db = require('./db');

//Test SQL query 
let sql = "select now()";
db.query(sql, function (err, results){
    //what to do when query results come back? 
    if(err) {
        console.log("Running the query failed.", err);
    }   else {
        console.log("The query was successful. => \n", results);
    }
});

//start server
let PORT = process.env.PORT || 3306;
app.listen(PORT, function(){
    console.log("GeoApp started on port", PORT);
});

//test endpoint 
app.get('/', (req, res) => res.send('Hello World'));
