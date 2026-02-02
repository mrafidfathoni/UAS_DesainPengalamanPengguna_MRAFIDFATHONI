const mysql = require("mysql2/promise");
const dbConfig = require("./config/db.config.js");

async function clearReports() {
    try {
        const connection = await mysql.createConnection({
            host: dbConfig.HOST,
            user: dbConfig.USER,
            password: dbConfig.PASSWORD,
            database: dbConfig.DB
        });

        console.log("Clearing reports table...");
        await connection.query("TRUNCATE TABLE reports");
        console.log("All reports cleared!");

        await connection.end();
        process.exit(0);
    } catch (error) {
        console.error("Error clearing reports:", error);
        process.exit(1);
    }
}

clearReports();
