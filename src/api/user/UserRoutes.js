const router = require('express').Router();
const {
  getAllUsers, getUserByEmail, postUser, updateUser, deleteUser,
} = require('./UserController');

router.get('/users', getAllUsers);
router.get('/user:id', getUserByEmail);

router.post('/user', postUser);

router.put('/user', updateUser);

router.delete('/user', deleteUser);

module.exports = router;
