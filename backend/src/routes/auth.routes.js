const express = require('express');
const authController = require('../controllers/auth.controller'); // <--- Đã sửa dòng này
const { authenticateToken } = require('../middlewares/auth.middleware');

const router = express.Router();

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.get('/me', authenticateToken, authController.me);

module.exports = router;