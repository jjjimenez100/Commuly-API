const router = require('express').Router();
const {
  getAllUsers, getUserById, postUser, updateUser, deleteUser,
} = require('./UserController');
const { UserValidation, idValidation } = require('./UserValidation');
const { validate } = require('../../util/schemaValidation');

router.get('/users', getAllUsers);
router.get('/user/:id', idValidation, validate, getUserById);

router.post('/users', UserValidation, validate, postUser);

router.put('/user/:id', UserValidation, validate, updateUser);

router.delete('/user/:id', idValidation, validate, deleteUser);

module.exports = router;
