const UserRepository = require('./UserRepository');

const getAllUsers = () => UserRepository.getAllUsers();

const getUserById = (id) => UserRepository.getUserById(id);

const registerUser = (user) => UserRepository.saveUser(user);

const updateUser = (id, user) => UserRepository.updateUser(id, user);

const unregisterUser = (id) => UserRepository.deleteUserById(id);

const addScheduleToUsers = (teams) => {

};

const removeScheduleToUsers = (teams) => {

};

const addTodoToUsers = (teams) => {

};

const removeTodoToUsers = (teams) => {

};

const markTodoAsDone = () => {

};

const markTodoAsStuck = () => {

};

module.exports = {
  getAllUsers, getUserById, registerUser, unregisterUser, updateUser,
};
