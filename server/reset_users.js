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

    const deleteReports = "DELETE FROM reports";
    const deleteUsers = "DELETE FROM users";
    const resetAutoIncrementReports = "ALTER TABLE reports AUTO_INCREMENT = 1";
    const resetAutoIncrementUsers = "ALTER TABLE users AUTO_INCREMENT = 1";

    connection.query(deleteReports, (err, result) => {
        if (err) {
            console.error("Error deleting reports:", err);
            connection.end();
            return;
        }
        console.log(`Deleted ${result.affectedRows} reports.`);

        connection.query(deleteUsers, (err, result) => {
            if (err) {
                console.error("Error deleting users:", err);
                connection.end();
                return;
            }
            console.log(`Deleted ${result.affectedRows} users.`);

            connection.query(resetAutoIncrementReports, (err) => {
                if (err) console.error("Error resetting reports AI:", err);

                connection.query(resetAutoIncrementUsers, (err) => {
                    if (err) console.error("Error resetting users AI:", err);

                    console.log("All user data cleared.");
                    connection.end();
                });
            });
        });
    });
});
