const router = require('express').Router();

const TeamController = require('./TeamController');

router.patch('/team/:id', TeamController.patchTeam);

module.exports = router;
