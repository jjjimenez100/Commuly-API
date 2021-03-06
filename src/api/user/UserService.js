// Temp
const { ObjectId } = require('mongoose').Types;
//
const lodash = require('lodash');

const UserRepository = require('./UserRepository');
const CardService = require('../card/CardService');
const TeamService = require('../team/TeamService');

const { generateSalt, hashPassword } = require('../credentials');
const {
  DONE_STATUS, STUCK_STATUS, TODO_CONTENT, SCHEDULED_CONTENT,
  CONTENT_CARD, QUESTION_CARD,
} = require('../card/CardEnum');
const {
  REACTION_POINT,
  PIN_POINT,
  RESPONSE_POINT,
  EMPLOYEE_ROLE,
  PROGRAM_ADMINISTRATOR_ROLE,
  SUPERVISOR_ROLE,
} = require('./UserEnum');

const getUserCards = async (id) => {
  const userDetails = await UserRepository.getUserById(id);
  const {
    activeTeam,
    scheduledCards: scheduledIds,
    todoCards: todos,
    email,
    name,
    phoneNumber,
    pinnedCards: partialPinnedCards,
    reactedCards,
    respondedCards,
    role,
    teams,
  } = userDetails;

  const userPinnedCards = partialPinnedCards.map(
    (partialPinnedCard) => (
      { _id: partialPinnedCard, cardId: partialPinnedCard, pinType: EMPLOYEE_ROLE }
    ),
  );
  const { pinnedCards: activeTeamPinnedCards } = await TeamService.getPinnedCardsByTeamId(
    activeTeam,
  );
  const pinnedCards = [...activeTeamPinnedCards, ...userPinnedCards];

  const todoIds = todos.map(({ todoId }) => todoId);

  const partialTodoCards = await CardService.getCardsByIds(todoIds);
  const partialScheduledCards = await CardService.getCardsByIds(scheduledIds);
  const partialTeamCards = await CardService.getCardsByTeam(activeTeam);
  const unsortedTeamCards = partialTeamCards.filter((teamCard) => {
    const { cardType, _id: teamCardId } = teamCard;
    if (cardType === CONTENT_CARD) {
      return true;
    }
    return cardType === QUESTION_CARD && !respondedCards.includes(teamCardId);
  }).map((teamCard) => {
    const { _id: teamCardId } = teamCard;
    const match = pinnedCards.find(({ cardId }) => cardId.toString() === teamCardId.toString());

    if (match) {
      const { pinType } = match;
      // eslint-disable-next-line no-underscore-dangle
      return { ...teamCard._doc, pinType, isPinned: true };
    }
    // eslint-disable-next-line no-underscore-dangle
    return { ...teamCard._doc, isPinned: false };
  });
  const employeePinnedCard = unsortedTeamCards.find(({ isPinned, pinType = '' }) => isPinned && pinType === EMPLOYEE_ROLE);
  const programAdministratorPinnedCard = unsortedTeamCards.find(({ isPinned, pinType = '' }) => isPinned && pinType === PROGRAM_ADMINISTRATOR_ROLE);
  const supervisorPinnedCard = unsortedTeamCards.find(({ isPinned, pinType = '' }) => isPinned && pinType === SUPERVISOR_ROLE);

  const teamCards = unsortedTeamCards.filter(({ isPinned }) => !isPinned);

  const todoTeamCards = teamCards.filter(({ contentCardType = '' }) => contentCardType === TODO_CONTENT);
  const todoCards = lodash.uniqBy(
    [...partialTodoCards, ...todoTeamCards], ({ _id }) => _id.toString(),
  );

  // map todo cards with user status
  const todoCardsWithUserStatus = todoCards.filter((todoCard) => {
    const { _id: todoCardId } = todoCard;
    // should always have a match, or else, something went wrong with inserting data
    const matchedTodo = todos.find(({ todoId }) => todoId.toString() === todoCardId.toString());
    const status = matchedTodo ? matchedTodo.status : '';
    return status !== DONE_STATUS;
  });

  const teamCardsWithoutDoneTodos = teamCards.filter((teamCard) => {
    const { contentCardType, _id: todoCardId } = teamCard;
    if (contentCardType === TODO_CONTENT) {
      const matchedTodo = todos.find(({ todoId }) => todoId.toString() === todoCardId.toString());
      const status = matchedTodo ? matchedTodo.status : '';
      return status !== DONE_STATUS;
    }
    return true;
  });

  const scheduledTeamCards = teamCards.filter(({ contentCardType = '' }) => contentCardType === SCHEDULED_CONTENT);
  const scheduledCards = lodash.uniqBy(
    [...partialScheduledCards, ...scheduledTeamCards], ({ _id }) => _id.toString(),
  );


  const user = {
    activeTeam,
    email,
    name,
    phoneNumber,
    pinnedCards,
    reactedCards,
    respondedCards,
    role,
    teams,
    employeePinnedCard,
    programAdministratorPinnedCard,
    supervisorPinnedCard,
  };
  const cards = {
    user,
    todoCards: todoCardsWithUserStatus,
    scheduledCards,
    teamCards: teamCardsWithoutDoneTodos,
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

const addCardReactionToUser = async (userId, cardId, reactionType) => {
  await UserRepository.addCardReactionToUser(userId, cardId, reactionType);
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

const removeCardResponseToUsers = (userIds, cardId) => UserRepository.removeCardResponseToUsers(
  userIds, cardId,
);

exports.addTodoToUsers = addTodoToUsers;
exports.getUserCards = getUserCards;
exports.getAllUsers = getAllUsers;
exports.getUserById = getUserById;
exports.getUserByEmail = getUserByEmail;
exports.registerUser = registerUser;
exports.unregisterUser = unregisterUser;
exports.updateUser = updateUser;
exports.addScheduleToUser = addScheduleToUser;
exports.addScheduleToUsers = addScheduleToUsers;
exports.removeScheduleToUsers = removeScheduleToUsers;
exports.removeScheduleToUser = removeScheduleToUser;
exports.addTodoToUser = addTodoToUser;
exports.addTodoToUsers = addTodoToUsers;
exports.removeTodoToUser = removeTodoToUser;
exports.removeTodoToUsers = removeTodoToUsers;
exports.markTodoAsDone = markTodoAsDone;
exports.markTodoAsStuck = markTodoAsStuck;
exports.updateUserPoints = updateUserPoints;
exports.addCardReactionToUser = addCardReactionToUser;
exports.removeCardReactionToUser = removeCardReactionToUser;
exports.addCardResponseToUser = addCardResponseToUser;
exports.removeCardResponseToUser = removeCardResponseToUser;
exports.pinCardToUserStream = pinCardToUserStream;
exports.unpinCardToUserStream = unpinCardToUserStream;
exports.removeCardResponseToUsers = removeCardResponseToUsers;
