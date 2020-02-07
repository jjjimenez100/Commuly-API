const logger = require('../../modules/logger');
const UserService = require('./UserService');
const { PIN_USER, UNPIN_USER } = require('./UserEnum');

const getAllUsers = async (request, response, next) => {
  try {
    const users = await UserService.getAllUsers();
    response.send(users);
  } catch (error) {
    next(error);
  }
};

const getUserById = async (request, response, next) => {
  try {
    const { id } = request.params;
    const user = await UserService.getUserById(id);
    response.send(user);
  } catch (error) {
    next(error);
  }
};

const getUserCards = async (request, response, next) => {
  try {
    const { id } = request.params;
    const user = await UserService.getUserCards(id);
    response.send(user);
  } catch (error) {
    next(error);
  }
};

const postUser = async (request, response, next) => {
  try {
    // Get only necessary values, prevents http pollution
    const {
      firstName,
      lastName,
      phoneNumber,
      avatarUrl,
      email,
      role,
      password,
    } = request.body;

    const user = {
      firstName,
      lastName,
      phoneNumber,
      avatarUrl,
      email,
      role,
      password,
    };

    const newUser = await UserService.registerUser(user);
    logger.info(`Registered new user: ${JSON.stringify(newUser)}`);
    response.send(newUser);
  } catch (error) {
    next(error);
  }
};

const updateUser = async (request, response, next) => {
  try {
    // Get only necessary values, prevents http pollution
    const {
      firstName,
      lastName,
      phoneNumber,
      avatarUrl,
      email,
      role,
    } = request.body;

    const { id } = request.params;

    const user = {
      firstName,
      lastName,
      phoneNumber,
      avatarUrl,
      email,
      role,
    };

    await UserService.updateUser(id, user);
    logger.info(`Updated user with ObjectID of ${id}`);
    response.status(204).send();
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (request, response, next) => {
  try {
    const { id } = request.params;
    await UserService.unregisterUser(id);
    logger.info(`Deleted user with ObjectID of ${id}`);
    response.status(204).send();
  } catch (error) {
    next(error);
  }
};

const patchUserCard = async (request, response, next) => {
  try {
    const { patchType } = request.body;
    const { userId, cardId } = request.body;
    if (patchType === PIN_USER) {
      await UserService.pinCardToUserStream(userId, cardId);
    } else if (patchType === UNPIN_USER) {
      await UserService.unpinCardToUserStream(userId, cardId);
    }
    response.status(200).send();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllUsers, getUserCards, getUserById, postUser, updateUser, deleteUser, patchUserCard,
};
