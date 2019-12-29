const logger = require('../../config/winston');

const getAllUsers = (request, response) => {
  logger.info('inside get all users');
  response.send('OK');
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
