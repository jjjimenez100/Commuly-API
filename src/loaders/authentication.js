const passport = require('passport');
const LocalStrategy = require('passport-local');
const logger = require('../modules/logger');
const UserModel = require('../api/user/UserModel');
const { isPasswordValid } = require('../api/credentials');

const initAuthenticationStrategy = () => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: 'user[email]',
        passwordField: 'user[password]',
      },
      (email, password, done) => {
        UserModel.findOne({ email }).then((user) => {
          if (!user || isPasswordValid(password)) {
            logger.info(`Invalid user credentials from user ${user}`);
            return done(null, false, { errors: { 'email or password': 'is invalid' } });
          }

          return done(null, user);
        }).catch((error) => {
          logger.error(`Exception at authentication module ${error}`);
        });
      },
    ),
  );
};

module.exports = initAuthenticationStrategy;
