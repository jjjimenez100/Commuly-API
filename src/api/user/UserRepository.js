const User = require('./UserModel');

const getAllUsers = () => User.find({}).exec();

const getUserById = (id) => User.findById(id).exec();

const saveUser = (user) => User.create(user);

const updateUser = (_id, user) => User.findOneAndUpdate(
  { _id }, user, { useFindAndModify: false },
).exec();

const deleteUserById = (id) => User.findByIdAndDelete(id).exec();

module.exports = {
  getAllUsers, getUserById, saveUser, deleteUserById, updateUser,
};
