const mongoose = require('mongoose');
const plm = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'userame is required'],
    min: 2,
    max: 100,
  },
  email: {
    type: String,
  },
});

const options = ({ missingUsernameError: 'Wrong Username', missingPasswordError: 'Wrong Password' });
userSchema.plugin(plm, options);

module.exports = mongoose.model('User', userSchema);
