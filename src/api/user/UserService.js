const UserRepository = require('./UserRepository');

const getAllUsers = () => UserRepository.getAllUsers();

const getUser = (email) => UserRepository.getUserByEmail(email);

const registerUser = (user) => UserRepository.saveUser(user);

// TODO: update user

const unregisterUser = (email) => UserRepository.deleteUserByEmail(email);

module.exports = {
  getAllUsers, getUser, registerUser, unregisterUser,
};
