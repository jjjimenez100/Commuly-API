const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  phoneNumber: String,
  avatarUrl: String,
  email: String,
  password: String,
  role: String,
});
const User = model('User', userSchema);


const { body } = require('express-validator');
const { requiredString } = require('../../util/schemaValidation');

const firstNameValidation = requiredString('firstName');
const lastNameValidation = requiredString('lastName');
const phoneNumberValidation = requiredString('phoneNumber');
const passwordValidation = requiredString('password');
const roleValidation = requiredString('role');
const avatarUrlValidation = body('avatarUrl').isURL();
const emailValidation = body('email').isEmail();

const UserValidation = [
  firstNameValidation,
  lastNameValidation,
  phoneNumberValidation,
  passwordValidation,
  roleValidation,
  avatarUrlValidation,
  emailValidation,
];

module.exports = { User, UserValidation };
