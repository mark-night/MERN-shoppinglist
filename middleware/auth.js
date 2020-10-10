const tokenAuth = require('../server-config').tokenAuth;

// Middleware is called with 3 arguments: request, response, next
// Middleware calls next() to pass down request/response or skip to certain route
module.exports = (req, res, next) => {
  const token = req.header('x-auth-token');

  if (!token)
    return res
      .status(401)
      .json({ msg: 'No token found, authorization denied.' });

  try {
    const decoded = tokenAuth(token);
    req.userId = decoded.id;
    next();
  } catch (err) {
    if (err && err.name && err.name === 'TokenExpiredError') {
      return res
        .status(400)
        .json({ msg: 'Token expired, reauthentication is needed.' });
    }
    return res.status(400).json({ msg: 'Authorization failed.' });
  }
};
