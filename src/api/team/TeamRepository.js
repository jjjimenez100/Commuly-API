const Team = require('./TeamModel');

const addSchedule = (teamId, scheduleId) => Team.findOneAndUpdate(
  {
    _id: teamId,
  },
  {
    $push: {
      scheduledCards: scheduleId,
    },
  },
  { useFindAndModify: false },
).exec();

const removeSchedule = () => {};

const addTodo = (teamId, todoId) => Team.findOneAndUpdate(
  {
    _id: teamId,
  },
  {
    $push: {
      todoCards: todoId,
    },
  },
  { useFindAndModify: false },
).exec();

const removeTodo = () => {};

module.exports = {
  addSchedule,
  removeSchedule,
  addTodo,
  removeTodo,
};
