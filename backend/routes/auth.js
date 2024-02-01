const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');

router.post('/passUId', authController.passUId)

module.exports = router;