const router = require('express').Router();
const multer = require('multer');

const upload = multer();
const CardController = require('./CardController');

router.get('/cards', CardController.getCards);
router.post('/card/:id', upload.single('file'), CardController.postCard);

module.exports = router;
