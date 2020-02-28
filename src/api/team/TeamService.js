const TeamRepository = require('./TeamRepository');

const addScheduleToTeam = (teamId, scheduleId) => TeamRepository.addSchedule(teamId, scheduleId);

const addTodoToTeam = (teamId, todoId) => TeamRepository.addTodo(teamId, todoId);

const pinCardToTeamStream = (teamId, cardId, pinType) => TeamRepository.pinCard(
  teamId, cardId, pinType,
);

const unpinCardToTeamStream = (teamId, cardId) => TeamRepository.unpinCard(teamId, cardId);

module.exports = {
  addScheduleToTeam,
  addTodoToTeam,

  pinCardToTeamStream,
  unpinCardToTeamStream,
};
