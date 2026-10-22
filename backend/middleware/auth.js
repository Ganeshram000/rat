// backend/middleware/auth.js
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'neevsaathi_super_secure_jwt_secret_jaipur_construction_2025';

function requireAuth(req, res, next) {
  try {
    let token = null;

    if (req.cookies && req.cookies.neevsaathi_token) {
      token = req.cookies.neevsaathi_token;
    } else if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({ error: 'Unauthorized. Admin login required.' });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid or expired session. Please log in again.' });
  }
}

module.exports = {
  requireAuth,
  JWT_SECRET
};
