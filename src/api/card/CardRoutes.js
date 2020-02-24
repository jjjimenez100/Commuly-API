const router = require('express').Router();
const multer = require('multer');

const upload = multer();
const CardController = require('./CardController');

router.get('/cards', CardController.getCards);
router.post('/card', upload.single('file'), CardController.postCard);
router.patch('/card/:id', CardController.patchCard);
router.put('/card/:id', CardController.putCard);

module.exports = router;
