const mysql = require("mysql2");
const dbConfig = require("./config/db.config.js");

const connection = mysql.createConnection({
    host: dbConfig.HOST,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
    database: dbConfig.DB
});

connection.connect((err) => {
    if (err) {
        console.error("Error connecting: " + err.stack);
        return;
    }
    console.log("Connected to database.");

    const alterQuery = "ALTER TABLE reports MODIFY COLUMN photo_path TEXT";

    connection.query(alterQuery, (err, result) => {
        if (err) {
            console.error("Error altering table:", err);
        } else {
            console.log("Table altered successfully: photo_path is now TEXT.");
        }
        connection.end();
    });
});
