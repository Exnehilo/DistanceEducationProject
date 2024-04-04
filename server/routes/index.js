const Router = require('express')
const router = new Router()

const userRouter = require('./UserRouter')
const courseRouter = require('./CourseRouter')
const groupRouter = require('./GroupRouter')

// router.use('/cabinet',)
router.use('/courses', courseRouter)
router.use('/user', userRouter)
router.use('/group', groupRouter)

module.exports = router 