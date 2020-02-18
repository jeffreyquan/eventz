const authController = require('../controllers/authController');
const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

router.post('/', authController.loginUser);
router.get('/user', auth, authController.loadUser);

module.exports = router;
