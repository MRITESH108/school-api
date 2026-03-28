const mysql = require("mysql2");

const db = mysql.createConnection(process.env.DATABASE_URL);

db.connect((err) => {
    if (err) {
        console.error("Connection failed:", err);
    } else {
        console.log("Connected to MySQL");
    }
});

module.exports = db;