const jwt = require('jsonwebtoken');
const tokenAge = parseInt(process.env.TOKEN_AGE);

module.exports = {
  getToken: id =>
    jwt.sign({ id }, process.env.TOKEN_KEY, { expiresIn: tokenAge }),
  tokenAuth: token =>
    jwt.verify(token, process.env.TOKEN_KEY, { maxAge: tokenAge }),
};
