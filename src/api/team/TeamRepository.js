const Team = require('./TeamModel');

const addSchedule = (teamId, scheduleId) => Team.findOneAndUpdate(
  {
    _id: teamId,
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

const removeSchedule = () => {};

const addTodo = () => {};

const removeTodo = () => {};

module.exports = {
  addSchedule,
  removeSchedule,
  addTodo,
  removeTodo,
};
