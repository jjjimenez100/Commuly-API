const router = require('express').Router();
const {
  getAllUsers, getUserById, postUser, updateUser, deleteUser,
} = require('./UserController');
const { UserValidation, idValidation } = require('./UserValidation');
const { validate } = require('../../util/schemaValidation');

router.get('/users', getAllUsers);
router.get('/user/:id', idValidation, validate, getUserById);

router.post('/user', UserValidation, validate, postUser);

// TODO
router.put('/user', updateUser);

router.delete('/user/:id', idValidation, validate, deleteUser);

module.exports = router;
