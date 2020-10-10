const jwt = require('jsonwebtoken');
const tokenKey = process.env.JWT_KEY || 'MERN_SL_whatever';
const tokenLifespan = 3600;
const mongoURI =
  process.env.DB_STRING || 'mongodb://localhost:27017/MERN-shopping-list';

module.exports = {
  mongoURI,
  getToken: id => jwt.sign({ id }, tokenKey, { expiresIn: tokenLifespan }),
  tokenAuth: token => jwt.verify(token, tokenKey, { maxAge: tokenLifespan }),
};
