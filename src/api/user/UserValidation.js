const { body, param } = require('express-validator');
const { requiredString } = require('../../util/schemaValidation');

const idValidation = param('id').isMongoId();
const firstNameValidation = requiredString('firstName');
const lastNameValidation = requiredString('lastName');
const phoneNumberValidation = requiredString('phoneNumber');
const roleValidation = requiredString('role');
const avatarUrlValidation = body('avatarUrl').isURL();
const emailValidation = body('email').isEmail();

const UserValidation = [
  firstNameValidation,
  lastNameValidation,
  phoneNumberValidation,
  roleValidation,
  avatarUrlValidation,
  emailValidation,
];

module.exports = { UserValidation, idValidation };
