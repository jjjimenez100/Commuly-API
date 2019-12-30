const router = require('express').Router();
const { getAllCards } = require('./CardController');

router.get('/cards', getAllCards);

module.exports = router;
