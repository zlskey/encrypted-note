const router = require('express').Router()
const authRouter = require('./authRouter')
const noteRouter = require('./noteRouter')
const settingsRouter = require('./settingsRouter')
const userRouter = require('./userRouter')

const checkUser = require('../middlewares/checkUser')

router.use('/auth', authRouter)

router.use(checkUser)

router.use('/note', noteRouter)
router.use('/user', userRouter)
router.use('/settings', settingsRouter)

module.exports = router