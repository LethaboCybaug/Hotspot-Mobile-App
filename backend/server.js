//importing required modules
import express from "express";
import mysql from "mysql2";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";

//Install dotenv
//Install mysql2
//Run npm install from the package.json file

// Load environment variables from .env file
// This is important for security and to avoid hardcoding sensitive information
dotenv.config();

import express from "express";
import mysql from "mysql2";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(cors());
app.use(bodyParser.json());

// Create a MySQL connection using environment variables
// This allows you to keep your database credentials secure and not hardcoded in your code
// Make sure to create a .env file in the root of your project with the following variables:
// DB_HOST, DB_USER, DB_PASSWORD, DB_NAME
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL");
});

app.post("/api/signup", (req, res) => {
  const { username, email, phoneNumber } = req.body;

  // Changed the SQL query to use the correct column names from the database script
  const query = "INSERT INTO user (name, email, phone_number) VALUES (?, ?, ?)";
  db.query(query, [username, email, phoneNumber], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Database error" });
    }
    res.status(200).json({ message: "User signed up successfully" });
  });
});

app.post("/api/login", (req, res) => {
  const { email, phoneNumber } = req.body;

  const query = "SELECT * FROM user WHERE email = ? AND phone_number = ?";
  db.query(query, [email, phoneNumber], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Database error" });
    }

    if (results.length > 0) {
      res.status(200).json({ message: "User exists" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  });
});

// I'll try to continue with the OTP request
app.post("/api/request-otp", (req, res) => {
  const otp = Math.floor(10000 + Math.random() * 90000).toString();
  res.status(200).json({ otp });
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
