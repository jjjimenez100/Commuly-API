const router = require('express').Router();
const {
  getAllUsers, getUserById, getUserCards, postUser, updateUser, deleteUser,
} = require('./UserController');
const { UserValidation, idValidation } = require('./UserValidation');
const { validate } = require('../validation');

router.get('/users', getAllUsers);
router.get('/user/:id', idValidation, validate, getUserById);
router.get('/user/:id/cards', idValidation, validate, getUserCards);

router.post('/users', UserValidation, validate, postUser);

router.put('/user/:id', UserValidation, validate, updateUser);

router.delete('/user/:id', idValidation, validate, deleteUser);

module.exports = router;
