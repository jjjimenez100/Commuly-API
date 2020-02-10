const { Schema, model } = require('mongoose');

const { ObjectId } = Schema.Types;

const userSchema = new Schema({
  name: String,
  phoneNumber: {
    type: String,
    unique: true,
  },
  email: {
    type: String,
    unique: true,
  },
  avatarUrl: String,
  role: String,
  activeTeam: ObjectId,
  pinnedCards: [ObjectId],
  todoCards: [{
    todoId: ObjectId,
    status: String,
  }],
  scheduledCards: [ObjectId],
  reactedCards: [ObjectId],
  teams: [ObjectId],
  respondedCards: [ObjectId],
  points: Number,

  // credentials
  hash: String,
  salt: String,
});

const User = model('User', userSchema);

module.exports = User;
