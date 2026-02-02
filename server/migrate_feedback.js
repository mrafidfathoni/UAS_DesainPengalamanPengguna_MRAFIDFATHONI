const mysql = require("mysql2/promise");
const dbConfig = require("./config/db.config.js");

async function migrate() {
    try {
        const connection = await mysql.createConnection({
            host: dbConfig.HOST,
            user: dbConfig.USER,
            password: dbConfig.PASSWORD,
            database: dbConfig.DB
        });

        console.log("Adding 'feedback' column to 'reports' table...");
        try {
            await connection.query(`ALTER TABLE reports ADD COLUMN feedback TEXT`);
            console.log("Column added successfully.");
        } catch (e) {
            if (e.code === 'ER_DUP_FIELDNAME') {
                console.log("Column 'feedback' already exists.");
            } else {
                throw e;
            }
        }

        await connection.end();
        process.exit(0);
    } catch (error) {
        console.error("Migration Failed:", error.message);
        process.exit(1);
    }
}

migrate();
