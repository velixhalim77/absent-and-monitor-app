const express = require('express');
const router = express.Router();
const employeeServices = require('../services/employeeServices');
const verifyToken = require('../middleware/verifyToken')

router.get('/', verifyToken, employeeServices.loadAllEmployees)
router.get(`/:id`, verifyToken, employeeServices.loadEmployeeDetail)
router.post('/',verifyToken, employeeServices.createEmployee)
router.put('/:id', verifyToken, employeeServices.editEmployee);
router.delete('/:id',verifyToken, employeeServices.deleteEmployee);

module.exports = router;