// server.js (ES Module version)

import express from "express";
import mysql from "mysql2";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(cors());
app.use(bodyParser.json());

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

app.post("/api/request-otp", (req, res) => {
  const otp = Math.floor(10000 + Math.random() * 90000).toString();
  res.status(200).json({ otp });
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
