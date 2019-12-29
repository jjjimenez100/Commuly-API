const logger = require('../../config/winston');
const UserService = require('./UserService');

const getAllUsers = async (request, response) => {
  const users = await UserService.getAllUsers();
  response.send(users);
};

const getUserById = async (request, response) => {
  const { id } = request.params;
  const user = await UserService.getUserById(id);
  response.send(user);
};

const postUser = async (request, response, next) => {
  // Get only necessary values, prevents http pollution
  const {
    firstName,
    lastName,
    phoneNumber,
    avatarUrl,
    email,
    role,
  } = request.body;

  const user = {
    firstName,
    lastName,
    phoneNumber,
    avatarUrl,
    email,
    role,
  };

  try {
    const newUser = await UserService.registerUser(user);
    response.send(newUser);
  } catch (error) {
    next(error);
  }
};

const updateUser = async (request, response) => {
  // TODO
  logger.info('inside update user');
  response.send('OK');
};

const deleteUser = async (request, response) => {
  const { id } = request.params;
  await UserService.unregisterUser(id);
  response.status(204).send();
};

module.exports = {
  getAllUsers, getUserById, postUser, updateUser, deleteUser,
};
