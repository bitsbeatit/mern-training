(authService => {
  'use strict'
  const jwt = require('jsonwebtoken');
  authService.issue = async (req, payload) => {
    const token = jwt.sign(payload, secret, {
      algorithm: algorithm,
      expiresIn: expiresIn,
    });
    return {
      success: true,
      token: token
    }

  }
  authService.verify = async (req, res, next) => {
    const token = req.body.token || req.query.token || req.headers['x-access-token'] || req.headers.authorization;
    if (token) {
      jwt.verify(token, 'secret', {
      }, async (err, decoded) => {
        if (err) {
          return res.status(404).send((err.name === 'TokenExpiredError') ? 'Token Expired' : 'Authentication Failed');
        } else {
          try {
            req.decoded = decoded;
            req.decoded.isAuthenticated = true;
            next();
            return null;
          } catch (error) {
            return res.status(404).send('Unauthorized Token')
          }
        }

      });
    } else {
      return res.status(404).send("Token is required");
    }
  }
})(module.exports);