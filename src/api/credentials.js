const crypto = require('crypto');
const jwtSigner = require('jsonwebtoken');
const moment = require('moment-timezone');

const { JWT_PRIVATE_KEY } = require('../config/authentication');

const ITERATIONS = 10000;
const KEY_LENGTH = 512;

const hashPassword = (password, salt) => crypto.pbkdf2Sync(password, salt, ITERATIONS, KEY_LENGTH, 'sha512').toString('hex');

const isPasswordValid = (password, salt, hash) => hashPassword(password, salt) === hash;

const generateSalt = () => crypto.randomBytes(16).toString('hex');

const generateJWT = (userId, email, role) => {
  const expirationDate = moment.tz().add(1, 'hour').format();
  const tokenDetails = {
    userId, email, role, expirationDate,
  };
  const token = jwtSigner.sign(tokenDetails, JWT_PRIVATE_KEY);

  return { token, expirationDate };
};

module.exports = {
  hashPassword,
  isPasswordValid,
  generateJWT,
  generateSalt,
};
