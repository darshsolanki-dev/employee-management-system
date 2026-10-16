const mysql = require("mysql2");

const requiredEnv = ["DB_HOST", "DB_USER", "DB_PASSWORD", "DB_NAME", "DB_PORT"];
const missingEnv = requiredEnv.filter((key) => !process.env[key]);

if (missingEnv.length > 0) {
    console.error("Missing MySQL environment values:", missingEnv.join(", "));
    console.error("Update your .env file before starting the app.");
    process.exit(1);
}

if (process.env.DB_PASSWORD === "YOUR_MYSQL_PASSWORD") {
    console.error("MySQL password is still the default placeholder in .env.");
    console.error("Replace it with your real local MySQL password, then restart the app.");
    process.exit(1);
}

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
});

db.connect((err) => {
    if (err) {
        console.error("MySQL Connection Failed:", err.message);
        return;
    }

    console.log("MySQL Connected Successfully!");
});

module.exports = db;
