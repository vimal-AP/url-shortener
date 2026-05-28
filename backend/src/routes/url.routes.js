const router = require('express').Router();
const auth = require('../middleware/auth');
const { createShortUrl, getUserUrls, deleteUrl } = require('../controllers/url.controller');
router.post('/', auth, createShortUrl);
router.get('/', auth, getUserUrls);
router.delete('/:id', auth, deleteUrl);
module.exports = router;