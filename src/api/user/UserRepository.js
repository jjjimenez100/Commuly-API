const User = require('./UserModel');

const getAllUsers = () => User.find({}).exec();

const getUserById = (userId) => User.findById(userId).exec();

const getUserByEmail = (email) => User.findOne({ email });

const saveUser = (user) => User.create(user);

const updateUser = (userId, user) => User.findOneAndUpdate(
  { _id: userId }, user, { useFindAndModify: false },
).exec();

const addSchedule = (userId, scheduleId) => User.findOneAndUpdate(
  {
    _id: userId,
  },
  {
    $push: {
      scheduledCards: scheduleId,
    },
  },
  { useFindAndModify: false },
).exec();

const addScheduleToMultipleUsers = (userIds, scheduleId) => User.updateMany(
  {
    _id: {
      $in: userIds,
    },
  },
  {
    $push: {
      scheduledCards: {
        scheduleId,
      },
    },
  },
  { useFindAndModify: false },
).exec();

const removeSchedule = (userId, scheduleId) => User.findOneAndUpdate(
  {
    _id: userId,
  },
  {
    $pull: {
      scheduledCards: scheduleId,
    },
  },
  { useFindAndModify: false },
).exec();

const removeScheduleToMultipleUsers = (userIds, scheduleId) => User.updateMany(
  {
    _id: {
      $in: userIds,
    },
  },
  {
    $pull: {
      scheduledCards: {
        scheduleId,
      },
    },
  },
  { useFindAndModify: false },
).exec();

const addTodo = (userId, todoId) => User.findOneAndUpdate(
  {
    _id: userId,
  },
  {
    $push: {
      todoCards: {
        todoId,
        status: 'N/A',
      },
    },
  },
  { useFindAndModify: false },
).exec();

const addTodoToMultipleUsers = (userIds, todoId) => User.updateMany(
  {
    _id: {
      $in: userIds,
    },
  },
  {
    $push: {
      todoCards: {
        todoId,
        status: 'N/A',
      },
    },
  },
  { useFindAndModify: false },
).exec();

const removeTodo = (userId, todoId) => User.findOneAndUpdate(
  {
    _id: userId,
  },
  {
    $pull: {
      todoCards: {
        todoId,
      },
    },
  },
  { useFindAndModify: false },
).exec();

const removeTodoToMultipleUsers = (userIds, todoId) => User.updateMany(
  {
    _id: {
      $in: userIds,
    },
  },
  {
    $pull: {
      todoCards: {
        todoId,
      },
    },
  },
  { useFindAndModify: false },
).exec();

const markTodo = (userId, todoId, status) => User.update(
  {
    _id: userId,
    'todoCards.todoId': todoId,
  },
  {
    $set: {
      'todoCards.$.status': status,
    },
  },
  { useFindAndModify: false },
).exec();

const deleteUserById = (id) => User.findByIdAndDelete(id).exec();

const updateUserPoints = (id, points) => User.findOneAndUpdate(
  { _id: id },
  { $inc: { points } },
  { useFindAndModify: false },
);

const addCardReactionToUser = (userId, cardId, reactionType) => User.findOneAndUpdate(
  {
    _id: userId,
  },
  {
    $push: {
      reactedCards: {
        cardId,
        reactionType,
      },
    },
  },
  { useFindAndModify: false },
).exec();

const removeCardReactionToUser = (userId, cardId) => User.findOneAndUpdate(
  {
    _id: userId,
  },
  {
    $pull: {
      reactedCards: {
        cardId,
      },
    },
  },
  { useFindAndModify: false },
).exec();

const pinCardToUserStream = (userId, cardId) => User.findOneAndUpdate(
  {
    _id: userId,
  },
  {
    $push: {
      pinnedCards: cardId,
    },
  },
  { useFindAndModify: false },
).exec();

const unpinCardToUserStream = (userId, cardId) => User.findOneAndUpdate(
  {
    _id: userId,
  },
  {
    $pull: {
      pinnedCards: cardId,
    },
  },
  { useFindAndModify: false },
).exec();

const addCardResponseToUser = (userId, cardId) => User.findOneAndUpdate(
  {
    _id: userId,
  },
  {
    $push: {
      respondedCards: cardId,
    },
  },
  { useFindAndModify: false },
).exec();

const removeCardResponseToUser = (userId, cardId) => User.findOneAndUpdate(
  {
    _id: userId,
  },
  {
    $pull: {
      respondedCards: cardId,
    },
  },
  { useFindAndModify: false },
).exec();

const removeCardResponseToUsers = (userIds, cardId) => User.findOneAndUpdate(
  {
    _id: {
      $in: userIds,
    },
  },
  {
    $pull: {
      respondedCards: cardId,
    },
  },
  { useFindAndModify: false },
).exec();

module.exports = {
  getAllUsers,
  getUserById,
  getUserByEmail,
  saveUser,
  deleteUserById,
  updateUser,

  addSchedule,
  addScheduleToMultipleUsers,
  removeSchedule,
  removeScheduleToMultipleUsers,

  addTodo,
  addTodoToMultipleUsers,
  removeTodo,
  removeTodoToMultipleUsers,

  updateUserPoints,

  addCardReactionToUser,
  removeCardReactionToUser,

  pinCardToUserStream,
  unpinCardToUserStream,

  addCardResponseToUser,
  removeCardResponseToUser,
  removeCardResponseToUsers,

  markTodo,
};
