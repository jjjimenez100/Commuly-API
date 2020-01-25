const User = require('./UserModel');

const getAllUsers = () => User.find({}).exec();

const getUserById = (id) => User.findById(id).exec();

const saveUser = (user) => User.create(user);

const updateUser = (_id, user) => User.findOneAndUpdate(
  { _id }, user, { useFindAndModify: false },
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

const addTodo = (userId, todoId, status) => User.findOneAndUpdate(
  {
    _id: userId,
  },
  {
    $push: {
      todoCards: {
        todoId, status,
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

const markTodoAsDone = (userId, todoId) => User.findOneAndUpdate(
  {
    _id: userId,
  },
  {
    $pull: {
      todoCards: {
        todoId,
        status: 
      },
    },
  },
  { useFindAndModify: false },
).exec();

const deleteUserById = (id) => User.findByIdAndDelete(id).exec();

module.exports = {
  getAllUsers, getUserById, saveUser, deleteUserById, updateUser, addSchedule, removeSchedule,
};
