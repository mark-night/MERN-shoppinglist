const router = require('express').Router();
const Item = require('../../models/Item');

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
// @access  Public
router.post('/', (req, res) => {
  const newItem = new Item({
    name: req.body.name,
  });
  newItem.save().then(item => res.json(item));
});

// @route   DELETE   /api/items/
// @desc    Delete an item
// @access  Public
router.delete('/:id', (req, res) => {
  Item.findById(req.params.id)
    .then(item => item.remove().then(() => res.json({ msg: 'Item removed.' })))
    .catch(err => res.status(404).json({ msg: 'Item was not found.' }));
});

module.exports = router;
