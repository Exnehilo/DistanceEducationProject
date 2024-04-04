const Router = require('express')
const router = new Router()
const userController = require('../controllers/UserController')
const authMiddleware = require('../middleware/authMiddleware')
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware')

router.get('/auth', authMiddleware, userController.check)
router.post('/registration', checkRoleMiddleware(['admin']), userController.registration)
router.post('/login', userController.login)
router.post('/changepassword', authMiddleware, userController.changePassword)
router.get('/getroleslist', checkRoleMiddleware(['admin']), userController.getUserRoles)
router.get('/getusersbyrole', checkRoleMiddleware(['admin']), userController.getUsersByRole)


module.exports = router
