//middlware/auth.js
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.id }; // Assurez-vous que req.user contient l'ID utilisateur
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};


/*//middlware/auth.js
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });

  try {
    const decoded = jwt.verify(token, 'secretKey');
    req.user = { id: decoded.userId }; // Ensure req.user contains the user ID
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
*/


























/*// middleware/auth.js
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });

  try {
    const decoded = jwt.verify(token, 'secretKey');
    req.user = { id: decoded.userId }; // Assurez-vous que req.user contient l'ID de l'utilisateur
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
*/

