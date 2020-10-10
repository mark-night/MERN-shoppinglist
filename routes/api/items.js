const router = require('express').Router();
const Item = require('../../models/Item');
const auth = require('../../middleware/auth');

// @route   GET   /api/items/
// @desc    Get all items
// @access  Public
router.get('/', (req, res) => {
  Item.find() // all items in db model
    .sort({ date: -1 }) // descending sort
    .then(items => res.json(items));
});

// @route   POST   /api/items/
// @desc    Create (post) a new item
// @access  Private <JWT>
router.post('/', auth, (req, res) => {
  const { name } = req.body;
  if (!name)
    return res.status(400).json({ msg: 'Item name can not be empty.' });
  Item.findOne({ name: new RegExp(`^${name}$`, 'i') }).then(item => {
    if (item)
      return res.status(400).json({ msg: 'Item was already in the list.' });
    const newItem = new Item({ name });
    newItem.save().then(item => res.json(item));
  });
});

// @route   DELETE   /api/items/
// @desc    Delete an item
// @access  Private <JWT>
router.delete('/:id', auth, (req, res) => {
  Item.findById(req.params.id).then(item => {
    if (!item) return res.status(404).json({ msg: 'Item was not found.' });
    item.remove().then(() => res.json({ msg: 'Item removed.' }));
  });
});

module.exports = router;
