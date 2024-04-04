const express = require('express')
const lessonController = require('../controllers/LessonController')
const authMiddleware = require('../middleware/authMiddleware')
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware')
const checkPermissionsMiddleware = require('../middleware/checkPermissionsMiddleware')
const taskRouter = require('./TaskRouter')
const responseRouter = require('./ResponseRouter')
const testRouter = require('./TestRouter')

const router = express.Router({ mergeParams: true })
const allowedRoles = ['admin', 'teacher']

router.get('/', authMiddleware, checkPermissionsMiddleware(['admin', 'teacher', 'student']), lessonController.getLessonsByCourse)
// router.post('/setgrade', authMiddleware, checkPermissionsMiddleware(allowedRoles), lessonController.setGrade)
router.post('/createlesson', checkRoleMiddleware(allowedRoles), lessonController.createLesson)
router.use('/:lessonId/tasks', taskRouter)
router.use('/:lessonId/responses', responseRouter)
router.use('/:lessonId/test', testRouter)

module.exports = router
