const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: 3307,  // Change the port here
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL on port 3307');
});

module.exports = db;
