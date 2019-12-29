const router = require('express').Router();
const {
  getAllUsers, getUserById, registerUser, updateUser, deleteUser,
} = require('./UserController');

router.get('/users', getAllUsers);
router.get('/user:id', getUserById);

router.post('/user', registerUser);

router.put('/user', updateUser);

router.delete('/user', deleteUser);

module.exports = router;
