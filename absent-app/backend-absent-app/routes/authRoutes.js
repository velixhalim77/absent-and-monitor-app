const express = require('express');
const router = express.Router();
const authServices = require('../services/authServices');

router.post('/login', authServices.login)
router.post('/register', authServices.register)

module.exports = router;