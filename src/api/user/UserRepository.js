const User = require('./UserModel');

const getAllUsers = () => User.find({});

const getUserByEmail = (email) => User.find({ email });

const saveUser = (user) => User.save(user);

// TODO: update user

const deleteUserByEmail = (email) => User.deleteOne({ email });

module.exports = {
  getAllUsers, getUserByEmail, saveUser, deleteUserByEmail,
};
