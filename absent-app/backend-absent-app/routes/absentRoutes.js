const express = require('express');
const router = express.Router();
const absentServices = require('../services/absentServices');
const verifyToken = require('../middleware/verifyToken')
const multer = require('multer');
const upload = multer();
router.post('/',verifyToken, upload.single('photo'), absentServices.checkIn);

module.exports = router;
