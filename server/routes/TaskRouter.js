const express = require('express')
const authMiddleware = require('../middleware/authMiddleware')
const taskController = require('../controllers/TaskController')
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware')
const checkPermissionsMiddleware = require('../middleware/checkPermissionsMiddleware')

const router = express.Router({ mergeParams: true })
const allowedRoles = ['admin', 'teacher']

router.get('/', authMiddleware, checkPermissionsMiddleware(allowedRoles), taskController.getAllTasksByLesson)
router.post('/createtask', checkRoleMiddleware(allowedRoles), taskController.createTasks)


module.exports = router