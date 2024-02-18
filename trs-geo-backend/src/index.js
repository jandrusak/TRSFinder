require("dotenv").config();
const express = require('express')
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

let routes = require("./routes");

app.use(routes);

app.get('/', (req, res) => {
    res.send("Hello World");
});

let PORT = process.env.PORT || 4001;
app.listen(PORT, function(){
    console.log("GeoApp started on port", PORT);
})