const router = require('express').Router();
const auth = require('../middleware/auth');
const { getAnalytics } = require('../controllers/analytics.controller');
router.get('/:id', auth, getAnalytics);
module.exports = router;