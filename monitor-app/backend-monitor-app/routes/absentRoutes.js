const express = require('express');
const router = express.Router();
const absentServices = require('../services/absentServices');
const verifyToken = require('../middleware/verifyToken')
const multer = require('multer');
const upload = multer();
router.get('/', verifyToken, absentServices.loadAllAbsent)
router.get(`/:id`, verifyToken, absentServices.loadAbsentByEmployeeId)
router.post('/:id',verifyToken, upload.single('photo'), absentServices.checkIn)
router.get('/photo/:id',verifyToken, absentServices.loadPhotoById)

module.exports = router;