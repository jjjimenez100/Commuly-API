const User = require('./UserModel');

const getAllUsers = () => User.find({}).exec();

const getUserById = (userId) => User.findById(userId).exec();

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

const addTodo = (userId, todoId) => User.findOneAndUpdate(
  {
    _id: userId,
  },
  {
    $push: {
      todoCards: {
        todoId,
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

module.exports = {
  getAllUsers,
  getUserById,
  saveUser,
  deleteUserById,
  updateUser,

  addSchedule,
  removeSchedule,

  addTodo,
  addTodoToMultipleUsers,
  removeTodo,
  removeTodoToMultipleUsers,

  markTodo,
};
