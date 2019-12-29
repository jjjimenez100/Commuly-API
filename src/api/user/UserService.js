const UserRepository = require('./UserRepository');

const getAllUsers = () => UserRepository.getAllUsers();

const getUserById = (id) => UserRepository.getUserById(id);

const registerUser = (user) => UserRepository.saveUser(user);

// TODO: update user

const unregisterUser = (email) => UserRepository.deleteUserByEmail(email);

module.exports = {
  getAllUsers, getUserById, registerUser, unregisterUser,
};
