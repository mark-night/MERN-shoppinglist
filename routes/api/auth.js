const router = require('express').Router();
const bcrypt = require('bcryptjs');
const getToken = require('../../server-config').getToken;
const User = require('../../models/User');
const auth = require('../../middleware/auth');

// @route   POST   /api/auth/
// @desc    Authenticate user
// @access  Public
router.post('/', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ msg: 'Please enter all fields.' });
  }

  User.findOne({ email }).then(user => {
    if (!user) return res.status(400).json({ msg: "User doesn't exist." });

    bcrypt.compare(password, user.password).then(isMatch => {
      if (!isMatch) return res.status(400).json({ msg: 'Wrong password.' });
      const token = getToken(user._id);
      res.json({
        token,
        user: { id: user._id, name: user.name, email: user.email },
      });
    });
  });
});

// @route   GET   /api/auth/user/
// @desc    Authenticate user
// @access  Private <JWT>
router.get('/user', auth, (req, res) => {
  User.findById(req.userId) // userId is added to request in middleware auth (if authenticated)
    .select('-password') // exclude 'password'
    .then(user => res.json(user));
});

module.exports = router;
