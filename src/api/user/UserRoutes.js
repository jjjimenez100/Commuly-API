const router = require('express').Router();

const jwt = require('express-jwt');
const { JWT_PRIVATE_KEY } = require('../../config/authentication');
const { roleChecker } = require('../roleChecker');
const {
  ADMINISTRATOR_ROLE,
  // USER_ROLES,
} = require('./UserEnum');

const {
  getAllUsers,
  getUserById,
  getUserCards,
  postUser,
  updateUser,
  deleteUser,
  patchUserCard,
  loginUser,
} = require('./UserController');
const { UserValidation, idValidation } = require('./UserValidation');
const { validate } = require('../validation');

router.get('/users', jwt({ secret: JWT_PRIVATE_KEY }), roleChecker([ADMINISTRATOR_ROLE]), getAllUsers);
router.get('/user/:id', idValidation, validate, getUserById);
router.get('/user/:id/cards', idValidation, validate, getUserCards);

// Public route for registration and login
router.post('/users', UserValidation, validate, postUser);
router.post('/login', loginUser);

router.put('/user/:id', UserValidation, validate, jwt({ secret: JWT_PRIVATE_KEY }), roleChecker([ADMINISTRATOR_ROLE]), updateUser);

router.patch('/user/:id/cards', jwt({ secret: JWT_PRIVATE_KEY }), roleChecker([ADMINISTRATOR_ROLE]), patchUserCard);

router.delete('/user/:id', idValidation, validate, jwt({ secret: JWT_PRIVATE_KEY }), roleChecker([ADMINISTRATOR_ROLE]), deleteUser);

module.exports = router;
