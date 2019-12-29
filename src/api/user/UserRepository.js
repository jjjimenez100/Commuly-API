const User = require('./UserModel');

const getAllUsers = () => User.find({});

const getUserById = (id) => User.findById(id);

const saveUser = (user) => User.create(user);

const updateUser = (_id, user) => User.findOneAndUpdate({ _id }, user, { useFindAndModify: false });

const deleteUserById = (id) => User.findByIdAndDelete(id);

module.exports = {
  getAllUsers, getUserById, saveUser, deleteUserById, updateUser,
};
