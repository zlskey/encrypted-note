const router = require('express').Router()
const authRouter = require('./auth.router')
const noteRouter = require('./note.router')
const settingsRouter = require('./settings.router')
const userRouter = require('./user.router')

const checkUser = require('../middlewares/checkUser')

router.use('/auth', authRouter)

router.use(checkUser)

router.use('/note', noteRouter)
router.use('/user', userRouter)
router.use('/settings', settingsRouter)

module.exports = router
