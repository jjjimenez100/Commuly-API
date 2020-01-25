const UserRepository = require('./UserRepository');

const getAllUsers = () => UserRepository.getAllUsers();

const getUserById = (id) => UserRepository.getUserById(id);

const registerUser = (user) => UserRepository.saveUser(user);

const updateUser = (id, user) => UserRepository.updateUser(id, user);

const unregisterUser = (id) => UserRepository.deleteUserById(id);

const addScheduleToUsers = (userId, scheduleId) => UserRepository.addSchedule(userId, scheduleId);

const removeScheduleToUsers = (userId, scheduleId) => UserRepository.removeSchedule(userId, scheduleId);

const addTodoToUsers = (userId, todoId, status) => UserRepository.addTodo(userId, todoId, status);

const removeTodoToUsers = (userId, todoId) => UserRepository.removeTodo(userId, todoId);

const markTodoAsDone = () => {

};

const markTodoAsStuck = () => {

};

module.exports = {
  getAllUsers, getUserById, registerUser, unregisterUser, updateUser,
};
