const User = require('./UserModel');

const getAllUsers = () => User.find({});

const getUserById = (id) => User.findById(id);

const saveUser = (user) => User.create(user);

// TODO: update user

const deleteUserByEmail = (email) => User.deleteOne({ email });

module.exports = {
  getAllUsers, getUserById, saveUser, deleteUserByEmail,
};
