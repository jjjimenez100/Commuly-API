const router = require('express').Router();

// require other routes here
const UserRoutes = require('./api/user/UserRoutes');
const CardRoutes = require('./api/card/CardRoutes');

router.use(UserRoutes);
router.use(CardRoutes);

module.exports = router;
