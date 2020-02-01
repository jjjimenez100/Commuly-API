const UserRepository = require('./UserRepository');
const CardService = require('../card/CardService');
const { DONE_STATUS, STUCK_STATUS } = require('../card/CardEnum');

const getUserCards = async (id) => {
  const userDetails = await UserRepository.getUserById(id);
  const { activeTeam, scheduledCards, todoCards } = userDetails;
  const todoIds = todoCards.map(({ todoId }) => todoId);
  const ids = [...scheduledCards, ...todoIds];

  const userCards = await CardService.getCardsByIds(ids);
  const teamCards = await CardService.getCardsByTeam(activeTeam);

  const cards = {
    userCards,
    teamCards,
  };

  return cards;
};

const getAllUsers = () => UserRepository.getAllUsers();

const getUserById = (id) => UserRepository.getUserById(id);

const registerUser = (user) => UserRepository.saveUser(user);

const updateUser = (id, user) => UserRepository.updateUser(id, user);

const unregisterUser = (id) => UserRepository.deleteUserById(id);

const addScheduleToUser = (userId, scheduleId) => UserRepository.addSchedule(userId, scheduleId);

const addScheduleToUsers = (userIds, scheduleId) => UserRepository.addScheduleToMultipleUsers(
  userIds, scheduleId,
);

const removeScheduleToUser = (userId, scheduleId) => UserRepository.removeSchedule(
  userId, scheduleId,
);

const removeScheduleToUsers = (userIds, scheduleId) => UserRepository.removeScheduleToMultipleUsers(
  userIds, scheduleId,
);

const addTodoToUser = (userId, todoId) => UserRepository.addTodo(userId, todoId);

const addTodoToUsers = (userIds, todoId) => UserRepository.addTodoToMultipleUsers(userIds, todoId);

const removeTodoToUser = (userId, todoId) => UserRepository.removeTodo(userId, todoId);

const removeTodoToUsers = (userIds, todoId) => UserRepository.removeTodoToMultipleUsers(
  userIds, todoId,
);

const markTodoAsDone = (userId, todoId) => UserRepository.markTodo(userId, todoId, DONE_STATUS);

const markTodoAsStuck = (userId, todoId) => UserRepository.markTodo(userId, todoId, STUCK_STATUS);

const addPointsToUser = (userId, points) => UserRepository.addPointsToUser(userId, points);

const pinCardToUserStream = (userId, cardId) => {

};

const unpinCardToUserStream = (userId, cardId) => {

};

module.exports = {
  getUserCards,

  getAllUsers,
  getUserById,
  registerUser,
  unregisterUser,
  updateUser,

  addScheduleToUser,
  addScheduleToUsers,
  removeScheduleToUsers,
  removeScheduleToUser,

  addTodoToUser,
  addTodoToUsers,
  removeTodoToUser,
  removeTodoToUsers,

  markTodoAsDone,
  markTodoAsStuck,

  pinCardToUserStream,
  unpinCardToUserStream,
};
