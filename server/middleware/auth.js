const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Invalid token' });
    }
    req.user = decoded;
    next();
  });
};

const isAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.is_admin) {
      next();
    } else {
      res.status(403).json({ error: 'Admin access required' });
    }
  });
};

module.exports = { verifyToken, isAdmin };
