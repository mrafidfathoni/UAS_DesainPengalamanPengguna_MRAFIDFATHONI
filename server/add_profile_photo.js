const mysql = require("mysql2/promise");
const dbConfig = require("./config/db.config.js");

async function addProfilePhotoColumn() {
    try {
        const connection = await mysql.createConnection({
            host: dbConfig.HOST,
            user: dbConfig.USER,
            password: dbConfig.PASSWORD,
            database: dbConfig.DB
        });

        console.log("Checking columns...");
        const [columns] = await connection.execute("SHOW COLUMNS FROM users LIKE 'profile_photo'");

        if (columns.length === 0) {
            console.log("Adding profile_photo column...");
            await connection.execute("ALTER TABLE users ADD COLUMN profile_photo VARCHAR(255)");
            console.log("Profile photo column added successfully.");
        } else {
            console.log("Profile photo column already exists.");
        }

        await connection.end();
    } catch (error) {
        console.error("Error:", error.message);
    }
}

addProfilePhotoColumn();
