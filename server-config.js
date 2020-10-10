const tokenKey = require('./server.json').tokenKey;
const mongoURI = require('./server.json').mongoURI;

const jwt = require('jsonwebtoken');
const tokenLifespan = 3600;

module.exports = {
  mongoURI,
  getToken: id => jwt.sign({ id }, tokenKey, { expiresIn: tokenLifespan }),
  tokenAuth: token => jwt.verify(token, tokenKey, { maxAge: tokenLifespan }),
};
