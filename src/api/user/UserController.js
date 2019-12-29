const logger = require('../../config/winston');
const UserService = require('./UserService');

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
    } = request.body;

    const user = {
      firstName,
      lastName,
      phoneNumber,
      avatarUrl,
      email,
      role,
    };

    const newUser = await UserService.registerUser(user);
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
    response.status(204).send();
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (request, response, next) => {
  try {
    const { id } = request.params;
    await UserService.unregisterUser(id);
    response.status(204).send();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllUsers, getUserById, postUser, updateUser, deleteUser,
};
