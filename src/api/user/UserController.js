const passport = require('passport');
const logger = require('../../modules/logger');
const UserService = require('./UserService');
const {
  PIN_USER, UNPIN_USER, DONE_STATUS, STUCK_STATUS,
} = require('./UserEnum');
const { generateJWT } = require('../credentials');
const { attachSignedCookieToResponse } = require('../../modules/implementations/awsCloudfront');
// temp, seed data for user upon registration
const { initSeeding } = require('../../seeders/dashboard');

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

const loginUser = async (request, response, next) => {
  // eslint-disable-next-line consistent-return
  passport.authenticate('login', async (err, user, { message }) => {
    try {
      if (err) {
        return next(message);
      }
      if (!user) {
        return response.status(400).send({ message });
      }
      request.login(user, { session: false }, async (error) => {
        if (error) {
          return next(error);
        }

        const {
          _id: userId, email, role, activeTeam,
        } = user;
        const { token, expirationDate } = generateJWT(userId, email, role, activeTeam);
        const signedResponse = attachSignedCookieToResponse(response);
        return signedResponse.send({
          userId,
          email,
          role,
          token,
          activeTeam,
          expirationDate,
        });
      });
    } catch (error) {
      return next(error);
    }
  })(request, response, next);
};

const postUser = async (request, response, next) => {
  try {
    // Get only necessary values, prevents http pollution
    const {
      name,
      phoneNumber,
      email,
      password,
    } = request.body;

    const user = {
      name,
      phoneNumber,
      email,
      password,
    };

    const newUser = await UserService.registerUser(user);
    // temp
    const { _id: userId } = newUser;
    await initSeeding(true, userId);
    //
    logger.info(`Registered new user: ${JSON.stringify(newUser)}`);
    response.status(201).send();
  } catch (error) {
    if (error.name === 'MongoError' && error.code === 11000) {
      response.status(400).send({
        message: 'Email or contact number already exists',
      });
    } else {
      next(error);
    }
    // next(error);
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
    const { patchType, cardId } = request.body;
    const { id: userId } = request.params;
    if (patchType === PIN_USER) {
      await UserService.pinCardToUserStream(userId, cardId);
    } else if (patchType === UNPIN_USER) {
      await UserService.unpinCardToUserStream(userId, cardId);
    } else if (patchType === DONE_STATUS) {
      await UserService.markTodoAsDone(userId, cardId);
    } else if (patchType === STUCK_STATUS) {
      await UserService.markTodoAsStuck(userId, cardId);
    }
    response.status(200).send();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllUsers,
  getUserCards,
  getUserById,
  postUser,
  updateUser,
  deleteUser,
  patchUserCard,
  loginUser,
};
