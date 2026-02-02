const db = require("../models/db");

exports.findAll = async (req, res) => {
    try {
        let query = "SELECT r.*, u.name as user_name FROM reports r LEFT JOIN users u ON r.user_id = u.id";
        const params = [];

        if (req.query.user_id) {
            query += " WHERE r.user_id = ?";
            params.push(req.query.user_id);
        }

        query += " ORDER BY created_at DESC";

        const [rows] = await db.execute(query, params);

        // Parse photo_path (JSON string -> Array or String)
        const parsedRows = rows.map(row => {
            let photos = [];
            try {
                // Try parsing as JSON array
                photos = JSON.parse(row.photo_path);
                // If it wasn't an array (legacy single string), make it an array
                if (!Array.isArray(photos) && photos) {
                    photos = [photos];
                } else if (!photos) {
                    photos = [];
                }
            } catch (e) {
                // If parse fails, assume it's a legacy single string path
                if (row.photo_path) {
                    photos = [row.photo_path];
                }
            }
            return { ...row, photo_path: photos[0] || null, photos: photos }; // Keep photo_path as first image for backward compat, add photos array
        });

        res.send(parsedRows);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.findOne = async (req, res) => {
    try {
        const [rows] = await db.execute("SELECT * FROM reports WHERE id = ?", [req.params.id]);
        if (rows.length === 0) return res.status(404).send({ message: "Report not found." });

        const row = rows[0];
        let photos = [];
        try {
            photos = JSON.parse(row.photo_path);
            if (!Array.isArray(photos) && photos) photos = [photos];
            else if (!photos) photos = [];
        } catch (e) {
            if (row.photo_path) photos = [row.photo_path];
        }

        res.send({ ...row, photo_path: photos[0] || null, photos: photos });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.create = async (req, res) => {
    try {
        console.log("--- Report Submission Start ---");
        console.log("Headers:", req.headers['content-type']);
        console.log("Body:", req.body);
        console.log("Files:", req.files);

        if (!req.body.category) {
            console.error("Error: Missing category");
            return res.status(400).send({
                message: `Content can not be empty! Got: ${JSON.stringify(req.body)}`
            });
        }

        // We'll set a default user ID if not present
        const userId = req.body.user_id || 1;

        const { category, location, address, description } = req.body;

        // Handle upload.any() -> req.files is array
        // Handle uploads
        let photoPath = '[]'; // Default empty JSON array
        if (req.files && req.files.length > 0) {
            const paths = req.files.map(f => f.path);
            photoPath = JSON.stringify(paths);
            console.log("Photos processed:", paths);
        } else {
            console.log("No photos uploaded");
        }

        const safeUserId = userId || 1;

        console.log("Inserting into DB...");
        const [result] = await db.execute(
            "INSERT INTO reports (user_id, category, location, address, description, photo_path) VALUES (?, ?, ?, ?, ?, ?)",
            [safeUserId, category, location, address, description, photoPath]
        );
        console.log("DB Insert success, ID:", result.insertId);

        res.status(201).send({ id: result.insertId, ...req.body, photo_path: photoPath });
    } catch (error) {
        console.error("Create Report Error:", error);
        res.status(500).send({ message: error.message || "Internal Server Error" });
    }
};

exports.updateStatus = async (req, res) => {
    try {
        const { status, feedback } = req.body;
        let query = "UPDATE reports SET status = ?";
        let params = [status];

        if (feedback !== undefined) {
            query += ", feedback = ?";
            params.push(feedback);
        }

        query += " WHERE id = ?";
        params.push(req.params.id);

        await db.execute(query, params);
        res.send({ message: "Status and feedback updated successfully." });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};
