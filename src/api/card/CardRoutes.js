const router = require('express').Router();
const CardController = require('./CardController');

router.get('/cards', CardController.getCards);

module.exports = router;
