const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  phoneNumber: String,
  avatarUrl: String,
  email: String,
  role: String,
  cards: [String],
});
const User = model('User', userSchema);

module.exports = User;
