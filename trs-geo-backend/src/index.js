const express = require('express')
const app = express();
let cors = require("cors");

app.use(cors)

require("dotenv").config

app.use(express.json());
let routes = require("./routes");
const db = require('./db');

app.use(routes);
//database connection
let PORT = process.env.PORT || 3306;
app.listen(PORT, function(){
    console.log("GeoApp started on port", PORT);
});

let authRoutes = require("./authRoutes");
app.use(authRoutes);
//start server

let helloRoutes = require("./routes")

//test endpoint 
console.log("hello world")