const config = require('config');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

function isAuth(req, res, next) {
  const token = req.header('x-auth-token');

  // check for token
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }
  try {
    // verify token
    const decoded = jwt.verify(token, config.get('jwtSecret'));

    // Add user from payload
    req.user = decoded;
    next();
  } catch (e) {
    res.status(400).json({ message: 'Token is not valid' });
  }
}

/**
 * assume isAuth middleware is already checked before this middleware
 * then we have req.user
 * the middleware will pass to next what so ever, but req.isSuperAdminAttribute is added
 * purpose: some resources are only accessible by the user itself and the Superadmin
 */
function isSuperAdmin(req, res, next) {
  User.findById(req.user.id).then(user => {
    if (!user) {
      res.status(404).send('User not found');
    }
    if (user.accountType === 'SuperAdmin') {
      req.isSuperAdmin = true;
    } else {
      req.isSuperAdmin = false;
    }
    next();
  });
}

module.exports = { isAuth, isSuperAdmin };
