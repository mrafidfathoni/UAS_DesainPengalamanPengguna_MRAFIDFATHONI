const mysql = require("mysql2/promise");
const dbConfig = require("./config/db.config.js");

async function initDB() {
    try {
        console.log("Connecting to MySQL Server...");
        // Connect without database selected first
        const connection = await mysql.createConnection({
            host: dbConfig.HOST,
            user: dbConfig.USER,
            password: dbConfig.PASSWORD
        });

        console.log("Creating Database if not exists...");
        await connection.query(`CREATE DATABASE IF NOT EXISTS \`${dbConfig.DB}\``);

        console.log(`Switching to ${dbConfig.DB}...`);
        await connection.query(`USE \`${dbConfig.DB}\``);

        console.log("Creating Users table...");
        await connection.query(`
            CREATE TABLE IF NOT EXISTS users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL UNIQUE,
                password VARCHAR(255) NOT NULL,
                phone VARCHAR(20),
                role VARCHAR(20) DEFAULT 'user',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);

        console.log("Creating Reports table...");
        await connection.query(`
            CREATE TABLE IF NOT EXISTS reports (
                id INT AUTO_INCREMENT PRIMARY KEY,
                user_id INT,
                category VARCHAR(100) NOT NULL,
                location VARCHAR(255),
                address TEXT,
                description TEXT,
                photo_path VARCHAR(255),
                status VARCHAR(20) DEFAULT 'Menunggu',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
            )
        `);

        console.log("Database initialized successfully!");
        await connection.end();
        process.exit(0);
    } catch (error) {
        console.error("Initialization Failed:", error.message);
        process.exit(1);
    }
}

initDB();
