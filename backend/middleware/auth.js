
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', ''); // Extract the token from Bearer header
  if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.id }; // Ensure req.user contains the user ID
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
