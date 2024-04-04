const Router = require('express')
const authMiddleware = require('../middleware/authMiddleware')
const router = new Router()

const groupController = require('../controllers/GroupController')
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware')

router.post('/', checkRoleMiddleware(['admin']), groupController.createGroup)
router.post('/getgrouplist', authMiddleware, groupController.getAll)

module.exports = router