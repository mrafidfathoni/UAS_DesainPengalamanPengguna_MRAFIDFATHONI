const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });

const helmet = require("helmet");
const compression = require("compression");
const rateLimit = require("express-rate-limit");


const app = express();

// Security Headers
app.use(helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" } // Allow images to be loaded by other domains (like localhost:5173)
}));

// Rate Limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: "Too many requests from this IP, please try again after 15 minutes"
});
app.use(limiter);

// Compression
app.use(compression());

const corsOptions = {
    origin: process.env.FRONTEND_URL || "*"
};
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "uploads"))); // Serve uploaded files

// Simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to LaporinAja API." });
});

// Import Routes
require("./routes/auth.routes")(app);
require("./routes/report.routes")(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
