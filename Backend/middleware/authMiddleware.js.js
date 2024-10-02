const jwt = require('jsonwebtoken');


const authenticateJWT = (roles) => {
  return (req, res, next) => {
    const userRole = req.user.role; // Assume req.user is set by your JWT middleware
    if (!roles.includes(userRole)) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    next();
  };
};


module.exports = { authenticateJWT };
