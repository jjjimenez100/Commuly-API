const logger = require('../../config/winston');
const User = require('./UserModel');

const getAllUsers = async (request, response) => {
  logger.info('inside get all users');
  const users = await User.find({});
  response.send(users);
};

const getUserById = (request, response) => {
  logger.info('inside get user by id');
  response.send('OK');
};

const registerUser = (request, response) => {
  logger.info('inside register user');
  response.send('OK');
};

const updateUser = (request, response) => {
  logger.info('inside update user');
  response.send('OK');
};

const deleteUser = (request, response) => {
  logger.info('inside delete user');
  response.send('OK');
};

module.exports = {
  getAllUsers, getUserById, registerUser, updateUser, deleteUser,
};
