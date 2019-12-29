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

module.exports = { UserValidation, emailValidation };
