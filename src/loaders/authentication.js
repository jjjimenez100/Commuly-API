const passport = require('passport');
const LocalStrategy = require('passport-local');
const logger = require('../modules/logger');
const UserService = require('../api/user/UserService');
const { isPasswordValid } = require('../api/credentials');

const initAuthenticationStrategy = () => {
  logger.info('Authentication Module');
  passport.use('login',
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password',
      },
      (email, password, done) => {
        UserService.getUserByEmail(email).then((user) => {
          if (!user) {
            return done(null, false, { message: 'User not found' });
          }

          if (!isPasswordValid(password, user.salt, user.hash)) {
            logger.info(`Invalid user credentials from user ${user}`);
            return done(null, false, { message: 'Email or password is invalid' });
          }

          return done(null, user, { message: 'Logged in successfully' });
        }).catch((error) => {
          logger.error(`Exception at authentication module ${error}`);
          return done(error);
        });
      },
    ));
  logger.info(' \u2714 loaded');
};

module.exports = { initAuthenticationStrategy };
