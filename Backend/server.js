const express = require('express');
const db =require('./config/db');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth'); // Import auth routes
const app = express();
const cors = require('cors'); // Import CORS

dotenv.config();

app.use(cors()); // Use CORS middleware
app.use(bodyParser.json());


// Use authentication routes
app.use('/api', authRoutes(db));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
