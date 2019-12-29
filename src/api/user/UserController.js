const logger = require('../../config/winston');
const UserService = require('./UserService');

const getAllUsers = async (request, response) => {
  const users = await UserService.getAllUsers();
  response.send(users);
};

const getUserByEmail = async (request, response) => {
  const { email } = request.body;
  const user = await UserService.getUserByEmail(email);
  response.send(user);
};

const postUser = async (request, response) => {
  const newUser = await UserService.registerUser(request.body);
  response.send(newUser);
};

const updateUser = async (request, response) => {
  // TODO
  logger.info('inside update user');
  response.send('OK');
};

const deleteUser = async (request, response) => {
  const { email } = request.body;
  await UserService.unregisterUser(email);
  response.status(204).send();
};

module.exports = {
  getAllUsers, getUserByEmail, postUser, updateUser, deleteUser,
};
