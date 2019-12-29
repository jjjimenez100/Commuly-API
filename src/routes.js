const router = require('express').Router();

// require other routes here
const UserRoutes = require('./api/user/UserRoutes');

router.use(UserRoutes);

module.exports = router;
