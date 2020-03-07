const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  name: {
    type: String,
    require: [true, 'Name is required'],
    min: 2,
  },
  ingredients: {
    type: [{ type: String }],
    require: [true, 'An ingredient is required'],
  },
  directions: {
    type: String,
  },
});

module.exports = mongoose.model('Recipe', recipeSchema);
