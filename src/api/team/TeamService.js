const TeamRepository = require('./TeamRepository');

const addScheduleToTeam = (teamId, scheduleId) => TeamRepository.addSchedule(teamId, scheduleId);

const addTodoToTeam = (teamId, todoId) => TeamRepository.addTodo(teamId, todoId);

module.exports = {
  addScheduleToTeam,
  addTodoToTeam,
};
