const express = require('express')

const testController = require('../controllers/TestController')
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware')

const router = express.Router({ mergeParams: true })
const allowedRoles = ['admin', 'teacher']

router.post('/create', checkRoleMiddleware(allowedRoles), testController.createTest)
router.post('/:testId/addquestions', checkRoleMiddleware(allowedRoles), testController.addQuestionsAndAnswers)

module.exports = router