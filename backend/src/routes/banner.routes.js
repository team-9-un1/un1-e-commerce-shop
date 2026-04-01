const express = require('express');
const router = express.Router();
const { getBanners, getBannerByKey, createBanner } = require('../controllers/banner.controller');
const { authenticateToken, requireAdmin } = require('../middlewares/auth.middleware');

router.get('/', getBanners);
router.get('/:key', getBannerByKey);
router.post('/', authenticateToken, requireAdmin, createBanner);

module.exports = router;
