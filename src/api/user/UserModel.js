const { Schema, model } = require('mongoose');

const { ObjectId } = Schema.Types;

const { EMPLOYEE_ROLE } = require('./UserEnum');

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
  role: {
    type: String,
    default: EMPLOYEE_ROLE,
  },
  activeTeam: ObjectId,
  pinnedCards: [ObjectId],
  todoCards: [{
    todoId: ObjectId,
    status: String,
  }],
  scheduledCards: [ObjectId],
  reactedCards: [{
    cardId: ObjectId,
    reactionType: String,
  }],
  teams: [ObjectId],
  respondedCards: [ObjectId],
  points: Number,

  // credentials
  hash: String,
  salt: String,
});

const User = model('User', userSchema);

module.exports = User;
