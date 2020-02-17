const authController = require('../controllers/authController');
const express = require("express");
const router = express.Router();

router.post("/", authController.loginUser);

module.exports = router;
