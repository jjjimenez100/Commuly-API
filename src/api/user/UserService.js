// Temp
const { ObjectId } = require('mongoose').Types;
//

const UserRepository = require('./UserRepository');
const CardService = require('../card/CardService');
const { generateSalt, hashPassword } = require('../credentials');
const { DONE_STATUS, STUCK_STATUS } = require('../card/CardEnum');
const { REACTION_POINT, PIN_POINT, RESPONSE_POINT } = require('./UserEnum');

const getUserCards = async (id) => {
  const userDetails = await UserRepository.getUserById(id);
  const { activeTeam, scheduledCards: scheduledIds, todoCards: todos } = userDetails;
  const {
    hash, salt, role, ...userWithoutPrivateInfo
  } = userDetails;
  const { _doc: user } = userWithoutPrivateInfo;
  const todoIds = todos.map(({ todoId }) => todoId);

  const todoCards = await CardService.getCardsByIds(todoIds);
  const scheduledCards = await CardService.getCardsByIds(scheduledIds);
  const teamCards = await CardService.getCardsByTeam(activeTeam);

  const cards = {
    user,
    todoCards,
    scheduledCards,
    teamCards,
  };

  return cards;
};

const getAllUsers = () => UserRepository.getAllUsers();

const getUserById = (id) => UserRepository.getUserById(id);

const getUserByEmail = (email) => UserRepository.getUserByEmail(email);

const registerUser = (user) => {
  const salt = generateSalt();
  const hash = hashPassword(user.password, salt);

  const { password, ...newUser } = user;
  newUser.salt = salt;
  newUser.hash = hash;
  // temp
  newUser.activeTeam = ObjectId('5e35bfdec83b1711f6965192');

  return UserRepository.saveUser(newUser);
};

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

const updateUserPoints = (userId, points) => UserRepository.updateUserPoints(userId, points);

const addCardReactionToUser = async (userId, cardId) => {
  await UserRepository.addCardReactionToUser(userId, cardId);
  await updateUserPoints(userId, REACTION_POINT);
};

const removeCardReactionToUser = async (userId, cardId) => {
  await UserRepository.removeCardReactionToUser(userId, cardId);
  await updateUserPoints(userId, -REACTION_POINT);
};

const pinCardToUserStream = async (userId, cardId) => {
  await UserRepository.pinCardToUserStream(userId, cardId);
  await updateUserPoints(userId, PIN_POINT);
};

const unpinCardToUserStream = async (userId, cardId) => {
  await UserRepository.unpinCardToUserStream(userId, cardId);
  await updateUserPoints(userId, -PIN_POINT);
};

const addCardResponseToUser = async (userId, cardId) => {
  await UserRepository.addCardResponseToUser(userId, cardId);
  await updateUserPoints(userId, RESPONSE_POINT);
};

const removeCardResponseToUser = async (userId, cardId) => {
  await UserRepository.removeCardResponseToUser(userId, cardId);
  await updateUserPoints(userId, -RESPONSE_POINT);
};

module.exports = {
  getUserCards,

  getAllUsers,
  getUserById,
  getUserByEmail,
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

  updateUserPoints,

  addCardReactionToUser,
  removeCardReactionToUser,

  addCardResponseToUser,
  removeCardResponseToUser,

  pinCardToUserStream,
  unpinCardToUserStream,
};
