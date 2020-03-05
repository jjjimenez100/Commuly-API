const Team = require('./TeamModel');

const getPinnedCardsByTeamId = (id) => Team.findById(id).exec();

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

const removeSchedule = (teamId, scheduleId) => Team.findOneAndUpdate(
  {
    _id: teamId,
  },
  {
    $pull: {
      scheduledCards: scheduleId,
    },
  },
  { useFindAndModify: false },
).exec();

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

const removeTodo = (teamId, todoId) => Team.findOneAndUpdate(
  {
    _id: teamId,
  },
  {
    $pull: {
      todoCards: todoId,
    },
  },
  { useFindAndModify: false },
).exec();

const pinCard = (teamId, cardId, pinType) => Team.findOneAndUpdate(
  {
    _id: teamId,
  },
  {
    $push: {
      pinnedCards: {
        cardId, pinType,
      },
    },
  },
  { useFindAndModify: false },
).exec();

const unpinCard = (teamId, cardId) => Team.findOneAndUpdate(
  {
    _id: teamId,
  },
  {
    $pull: {
      pinnedCards: {
        cardId,
      },
    },
  },
  { useFindAndModify: false },
).exec();

module.exports = {
  addSchedule,
  removeSchedule,
  addTodo,
  removeTodo,
  pinCard,
  unpinCard,
  getPinnedCardsByTeamId,
};
