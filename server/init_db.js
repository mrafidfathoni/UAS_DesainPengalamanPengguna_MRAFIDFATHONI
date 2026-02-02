const mysql = require("mysql2");
const dbConfig = require("./config/db.config.js");

// Connect to MySQL Server (without DB first)
const connection = mysql.createConnection({
    host: dbConfig.HOST,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD
});

connection.connect((err) => {
    if (err) {
        console.error("error connecting: " + err.stack);
        return;
    }
    console.log("connected as id " + connection.threadId);

    // Create Database
    connection.query(`CREATE DATABASE IF NOT EXISTS ${dbConfig.DB}`, (err, result) => {
        if (err) throw err;
        console.log("Database created or already exists.");

        // Switch to database
        connection.changeUser({ database: dbConfig.DB }, (err) => {
            if (err) throw err;

            // Create Users Table
            const createUsersTable = `
        CREATE TABLE IF NOT EXISTS users (
          id INT AUTO_INCREMENT PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          email VARCHAR(255) NOT NULL UNIQUE,
          password VARCHAR(255) NOT NULL,
          phone VARCHAR(20),
          role VARCHAR(20) DEFAULT 'user',
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `;
            connection.query(createUsersTable, (err, result) => {
                if (err) throw err;
                console.log("Users table created or already exists.");
            });

            // Create Reports Table
            const createReportsTable = `
        CREATE TABLE IF NOT EXISTS reports (
          id INT AUTO_INCREMENT PRIMARY KEY,
          user_id INT,
          category VARCHAR(50) NOT NULL,
          location VARCHAR(255),
          address TEXT,
          description TEXT,
          status VARCHAR(20) DEFAULT 'Menunggu',
          photo_path VARCHAR(255),
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (user_id) REFERENCES users(id)
        )
      `;
            connection.query(createReportsTable, (err, result) => {
                if (err) throw err;
                console.log("Reports table created or already exists.");

                // Seed Admin User (password: admin123)
                // Note: In real app, password should be hashed. Here we use plain for demo init or pre-hashed.
                // Let's assume we'll use bcrypt in the app. I'll insert a dummy admin manually if needed, 
                // but for now, let's just finish the structure.
                console.log("Database initialization finished.");
                connection.end();
            });
        });
    });
});
