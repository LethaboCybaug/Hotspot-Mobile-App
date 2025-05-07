<<<<<<< HEAD
const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'yourpassword',
  database: 'hotspot',
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL');
});

app.post('/api/signup', (req, res) => {
  const { username, email, phoneNumber } = req.body;

  const query = 'INSERT INTO users (username, email, phoneNumber) VALUES (?, ?, ?)';
  db.query(query, [username, email, phoneNumber], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Database error' });
    }
    res.status(200).json({ message: 'User signed up successfully' });
  });
});

app.post('/api/login', (req, res) => {
  const { email, phoneNumber } = req.body;

  const query = 'SELECT * FROM users WHERE email = ? AND phoneNumber = ?';
  db.query(query, [email, phoneNumber], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Database error' });
    }

    if (results.length > 0) {
      res.status(200).json({ message: 'User exists' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  });
});

app.post('/api/request-otp', (req, res) => {
  const otp = Math.floor(10000 + Math.random() * 90000).toString();
  res.status(200).json({ otp });
});

app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
=======
const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'yourpassword',
  database: 'hotspot',
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL');
});

app.post('/api/signup', (req, res) => {
  const { username, email, phoneNumber } = req.body;

  const query = 'INSERT INTO users (username, email, phoneNumber) VALUES (?, ?, ?)';
  db.query(query, [username, email, phoneNumber], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Database error' });
    }
    res.status(200).json({ message: 'User signed up successfully' });
  });
});

app.post('/api/login', (req, res) => {
  const { email, phoneNumber } = req.body;

  const query = 'SELECT * FROM users WHERE email = ? AND phoneNumber = ?';
  db.query(query, [email, phoneNumber], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Database error' });
    }

    if (results.length > 0) {
      res.status(200).json({ message: 'User exists' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  });
});

app.post('/api/request-otp', (req, res) => {
  const otp = Math.floor(10000 + Math.random() * 90000).toString();
  res.status(200).json({ otp });
});

app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
>>>>>>> 2c59cd9 (Added home page and resport)
});