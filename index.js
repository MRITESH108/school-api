const express = require("express");
const db = require("./config/db");
const { schoolRouter } = require("./routes/schoolRouter");

const app = express();
app.use(express.json());


app.use('/', schoolRouter);

const PORT = process.env.PORT; // node js don't need dotenv to install anymore
app.listen(PORT, ()=>{
    console.log("Server is running ");
    
})