const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();
const db =require('../config/db');

// Register
const registerUser = (db) => async (req, res) => {
  const {
    name,
    email,
    password,
    role,
    job_profile,
    description,
    github,
    resume,
    linkedin,
    twitter,
    insta,
    facebook,
    profile_pic
  } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    // Convert job_profile array to JSON string
    const user = {
      name,
      email,
      password: hashedPassword,
      role,
      job_profile: JSON.stringify(job_profile), // Convert array to JSON string
      description,
      github,
      resume,
      linkedin,
      twitter,
      insta,
      facebook,
      profile_pic
    };

    db.query('INSERT INTO users SET ?', user, (error) => {
      if (error) {
        return res.status(400).json({ message: 'Error registering user' });
      }
      res.status(201).json({ message: 'User registered successfully' });
    });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};


// Login
const loginUser = (db) => async (req, res) => {
  const { email, password } = req.body;

  db.query('SELECT * FROM users WHERE email = ?', [email], async (error, results) => {
    if (error || results.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    const user = results[0];
    const match = await bcrypt.compare(password, user.password);

    if (match) {
      const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.json({ token });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  });
};

// Middleware for authentication
const authenticateJWT = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.sendStatus(403);
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }
    req.user = user;
    next();
  });
};

// Role verification middleware
const roleMiddleware = (roles) => {
  return (req, res, next) => {
    const userRole = req.user.role;
    if (!roles.includes(userRole)) {
      return res.status(403).json({ message: 'Access denied: You do not have the required permissions.' });
    }
    next();
  };
};

// Admin Route
const adminDashboard = (req, res) => {
  res.json({ message: 'Welcome to the admin dashboard!' });
};

// Define routes
router.post('/register', registerUser(db));
router.post('/login', loginUser(db));
router.get('/admin/dashboard', authenticateJWT, roleMiddleware(['admin']), adminDashboard);

module.exports = (db) => router;
