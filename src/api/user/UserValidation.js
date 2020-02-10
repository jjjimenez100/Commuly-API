const { body, param } = require('express-validator');
const { requiredString } = require('../validation');

const idValidation = param('id').isMongoId();
const nameValidation = requiredString('name');
const phoneNumberValidation = requiredString('phoneNumber');
// const roleValidation = requiredString('role');
// const avatarUrlValidation = body('avatarUrl').isURL();
const emailValidation = body('email').isEmail();

const UserValidation = [
  nameValidation,
  phoneNumberValidation,
  emailValidation,
];

module.exports = { UserValidation, idValidation };
