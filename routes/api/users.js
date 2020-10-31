const router = require('express').Router();
const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const getToken = require('../../token-config').getToken;

// @route   POST   /api/users/
// @desc    Register new user
// @access  Public
router.post('/', (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ msg: 'Please input all fields.' });
  }
  User.findOne({ email }).then(user => {
    if (user) {
      return res.status(400).json({ msg: 'User already exists.' });
    }
    const newUser = new User({ name, email, password });
    // Create salt & hash for password
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser.save().then(user => {
          const token = getToken(user._id);
          res.json({
            user: { id: user._id, name: user.name, email: user.email },
            token,
          });
        });
      });
    });
  });
});

module.exports = router;
