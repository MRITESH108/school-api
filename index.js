const express = require("express");
const db = require("./config/db");
const { schoolRouter } = require("./routes/schoolRouter");
require("dotenv").config();

const app = express();
app.use(express.json());


app.use('/', schoolRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>{
    console.log("Server is running ");
    
})