const express = require('express')
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware')
const gradeController = require('../controllers/GradeController')

const router = express.Router({ mergeParams: true })
const allowedRoles = ['admin', 'teacher']

router.post('/', checkRoleMiddleware(allowedRoles), gradeController.setGrade)

module.exports = router