const mongoose = require("mongoose");

// Create (define) schema
const ItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

// mongoose automatically creates collection with lowercased plural form of the
// first argument, e.g. 'Item' -> 'items'
module.exports = mongoose.model("Item", ItemSchema);
