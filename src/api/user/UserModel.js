const { Schema, model } = require('mongoose');

const { ObjectId } = Schema.Types;

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  phoneNumber: String,
  avatarUrl: String,
  email: String,
  role: String,
  pinnedCards: [ObjectId],
  todoCards: [ObjectId],
  scheduledCards: [ObjectId],
  reactedCards: [ObjectId],
  teams: [ObjectId],
});
const User = model('User', userSchema);

module.exports = User;
