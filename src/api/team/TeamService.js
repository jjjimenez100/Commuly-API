const TeamRepository = require('./TeamRepository');

const addScheduleToTeam = (teamId, scheduleId) => TeamRepository.addSchedule(teamId, scheduleId);

const addTodoToTeam = (teamId, scheduleId) => TeamRepository.addTodo(teamId, scheduleId);

module.exports = {
  addScheduleToTeam,
  addTodoToTeam,
};
