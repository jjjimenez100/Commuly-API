const crypto = require('crypto');
const jwtSigner = require('jsonwebtoken');
const jwt = require('express-jwt');
const moment = require('moment-timezone');
const passport = require('passport');

const { JWT_PRIVATE_KEY } = require('../config/authentication');

const ITERATIONS = 10000;
const KEY_LENGTH = 512;

const hashPassword = (password, salt) => crypto.pbkdf2Sync(password, salt, ITERATIONS, KEY_LENGTH, 'sha512').toString('hex');

const isPasswordValid = (password, salt, hash) => hashPassword(password, salt) === hash;

const generateSalt = () => crypto.randomBytes(16).toString('hex');

const generateJWT = (userId, email) => {
  const expirationDate = moment.tz().add(1, 'hour');
  const tokenDetails = { userId, email, expirationDate };

  return jwtSigner.sign(tokenDetails, JWT_PRIVATE_KEY);
};

const getTokenFromHeaders = (request) => {
  const { headers: { authorization } } = request;
  const tokens = authorization.split(' ');

  if (authorization && tokens[0] === 'Token') {
    return tokens[1];
  }

  return null;
};

const authObj = {
  secret: 'secret',
  userProperty: 'payload',
  getToken: getTokenFromHeaders,
};

const auth = {
  required: jwt({
    ...authObj,
  }),
  optional: jwt({
    ...authObj,
    credentialsRequired: false,
  }),
};

const authenticate = () => new Promise((resolve, reject) => {
  passport.authenticate(
    'jwt',
    { session: false },
    (error, user) => {
      if (error) {
        reject(new Error(error));
      } else if (!user) {
        reject(new Error('Not authenticated'));
      }
      resolve(user);
    },
  );
});


module.exports = {
  hashPassword,
  isPasswordValid,
  generateJWT,
  generateSalt,

  auth,
  authenticate,
};
