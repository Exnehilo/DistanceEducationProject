const express = require('express')
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware')
const responseController = require('../controllers/ResponseController')
const gradeRouter = require('./GradeRouter')

const router = express.Router({ mergeParams: true })
const allowedRoles = ['admin', 'teacher']

router.post('/', checkRoleMiddleware(allowedRoles), responseController.getAllResponsesByLesson)
router.post('/:userId', checkRoleMiddleware(allowedRoles), responseController.getResponseByStudent)
router.post('/sendresponse', checkRoleMiddleware(['student'], responseController.sendResponse))
router.use('/:userId/grades', gradeRouter)

module.exports = router