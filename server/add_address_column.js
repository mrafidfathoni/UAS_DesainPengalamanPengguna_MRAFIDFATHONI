const mysql = require("mysql2/promise");
const dbConfig = require("./config/db.config.js");

async function addAddressColumn() {
    try {
        const connection = await mysql.createConnection({
            host: dbConfig.HOST,
            user: dbConfig.USER,
            password: dbConfig.PASSWORD,
            database: dbConfig.DB
        });

        console.log("Checking columns...");
        const [columns] = await connection.execute("SHOW COLUMNS FROM users LIKE 'address'");

        if (columns.length === 0) {
            console.log("Adding address column...");
            await connection.execute("ALTER TABLE users ADD COLUMN address TEXT");
            console.log("Address column added successfully.");
        } else {
            console.log("Address column already exists.");
        }

        await connection.end();
    } catch (error) {
        console.error("Error:", error.message);
    }
}

addAddressColumn();
