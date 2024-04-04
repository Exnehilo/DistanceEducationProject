const express = require('express')
const authMiddleware = require('../middleware/authMiddleware')
const courseController = require('../controllers/CourseController')
const lessonRouter = require('./LessonRouter')
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware')

const router = express.Router()
const allowedRoles = ['admin', 'teacher']

router.get('/', authMiddleware, courseController.getAll)
router.post('/create', checkRoleMiddleware(allowedRoles), courseController.createCourse)
router.use('/:courseId/lessons', lessonRouter)

module.exports = router
