const router = require('express').Router();
const multer = require('multer');

const upload = multer();
const CardController = require('./CardController');

router.get('/cards', CardController.getCards);
router.post('/card', upload.single('file'), CardController.postCard);
/**
 * This endpoint is a temporary workaround for updating
 * cards with files with PUT
 *
 * Axios issue: https://github.com/laravel/framework/issues/13457
 * Method spoofing (doesn't work): https://laracasts.com/discuss/channels/laravel/ajax-formdata-and-put-fails
 *
 */
router.post('/card/:id', upload.single('file'), CardController.putCard);

router.patch('/card/:id', CardController.patchCard);
router.put('/card/:id', CardController.putCard);

module.exports = router;
