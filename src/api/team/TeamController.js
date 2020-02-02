const TeamService = require('./TeamService');
const {
  ADD_SCHEDULE_TEAM,
  ADD_TODO_TEAM,
  PIN_CARD_TEAM,
  UNPIN_CARD_TEAM,
} = require('./TeamEnum');

const patchTeam = async (request, response, next) => {
  try {
    const { patchType, teamId, cardId } = request.body;
    if (patchType === ADD_SCHEDULE_TEAM) {
      await TeamService.addScheduleToTeam(teamId, cardId);
    } else if (patchType === ADD_TODO_TEAM) {
      await TeamService.addTodoToTeam(teamId, cardId);
    } else if (patchType === PIN_CARD_TEAM) {
      await TeamService.pinCardToTeamStream(teamId, cardId);
    } else if (patchType === UNPIN_CARD_TEAM) {
      await TeamService.unpinCardToTeamStream(teamId, cardId);
    }
    response.status(200).send();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  patchTeam,
};
