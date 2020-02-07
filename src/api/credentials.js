const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const moment = require('moment-timezone');

const ITERATIONS = 10000;
const KEY_LENGTH = 512;

const hashPassword = (password, salt) => crypto.pbkdf2Sync(password, salt, ITERATIONS, KEY_LENGTH, 'sha512').toString('hex');

const isPasswordValid = (password, salt, hash) => hashPassword(password, salt) === hash;

const generateSalt = () => crypto.randomBytes(16).toString('hex');

const generateJWT = (userId, email) => {
  const expirationDate = moment.tz().add(1, 'hour');
  return jwt.sign({
    userId, email, exp: expirationDate,
  });
};

module.exports = {
  hashPassword,
  isPasswordValid,
  generateJWT,
  generateSalt,
};
