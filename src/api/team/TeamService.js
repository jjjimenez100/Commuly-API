const TeamRepository = require('./TeamRepository');

const addScheduleToTeam = (teamId, scheduleId) => TeamRepository.addSchedule(teamId, scheduleId);

const addTodoToTeam = (teamId, todoId) => TeamRepository.addTodo(teamId, todoId);

const pinCardToTeamStream = (teamId, cardId) => TeamRepository.pinCard(teamId, cardId);

const unpinCardToTeamStream = (teamId, cardId) => TeamRepository.unpinCard(teamId, cardId);

module.exports = {
  addScheduleToTeam,
  addTodoToTeam,

  pinCardToTeamStream,
  unpinCardToTeamStream,
};
