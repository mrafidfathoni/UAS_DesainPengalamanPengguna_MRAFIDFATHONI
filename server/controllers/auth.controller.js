const db = require("../models/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
    try {
        const { name, email, password, phone } = req.body;

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 8);

        const [result] = await db.execute(
            "INSERT INTO users (name, email, password, phone) VALUES (?, ?, ?, ?)",
            [name, email, hashedPassword, phone]
        );

        res.status(201).send({ message: "User registered successfully!" });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log("Login attempt:", email);

        // Check Admin hardcode for demo (optional, but good to keep consistent with previous)
        if (email === 'admin' && password === 'admin123') {
            return res.status(200).send({
                id: 999,
                name: 'Administrator',
                email: 'admin@laporinaja.id',
                role: 'admin',
                token: 'admin-secret-token'
            });
        }
        // For now, let's stick to DB users.

        const [rows] = await db.execute("SELECT * FROM users WHERE email = ?", [email]);

        if (rows.length === 0) {
            console.log("User not found in DB");
            return res.status(404).send({ message: "User not found." });
        }

        const user = rows[0];
        console.log("User found:", user.id, user.name);
        console.log("Stored hash:", user.password);
        const passwordIsValid = await bcrypt.compare(password, user.password);
        console.log("Password valid:", passwordIsValid);

        if (!passwordIsValid) {
            return res.status(401).send({ token: null, message: "Invalid Password!" });
        }

        const token = jwt.sign({ id: user.id }, "secret-key", { expiresIn: 86400 }); // 24 hours

        res.status(200).send({
            id: user.id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            address: user.address,
            role: user.role,
            token: token
        });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.updateProfile = async (req, res) => {
    try {
        const { name, email, phone, address } = req.body;
        const userId = req.params.id;

        let query = "UPDATE users SET name = ?, email = ?, phone = ?, address = ?";
        const params = [name, email, phone, address];

        if (req.file) {
            query += ", profile_photo = ?";
            // Store relative path. Assuming server serves /uploads
            // On Windows path might use backslashes. Let's normalize or just store filename.
            // Let's store 'uploads/' + filename to be safe for static serve
            params.push('uploads/' + req.file.filename);
        }

        query += " WHERE id = ?";
        params.push(userId);

        await db.execute(query, params);

        // Fetch updated user to return fresh data (especially photo)
        const [rows] = await db.execute("SELECT profile_photo FROM users WHERE id = ?", [userId]);
        const updatedPhoto = rows[0] ? rows[0].profile_photo : null;

        res.send({
            message: "Profile updated successfully!",
            profile_photo: updatedPhoto
        });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.resetPassword = async (req, res) => {
    try {
        const { email, newPassword } = req.body;

        // Find user
        const [rows] = await db.execute("SELECT * FROM users WHERE email = ?", [email]);
        if (rows.length === 0) {
            return res.status(404).send({ message: "Email tidak ditemukan." });
        }

        const user = rows[0];

        // Hash new password
        const hashedPassword = await bcrypt.hash(newPassword, 8);

        // Update password
        await db.execute("UPDATE users SET password = ? WHERE id = ?", [hashedPassword, user.id]);

        res.send({ message: "Password berhasil diubah, silakan login kembali." });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};
