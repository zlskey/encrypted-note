const router = require('express').Router()
const checkUser = require('./middlewares/checkUser')
const authController = require('./controllers/authController')
const userController = require('./controllers/userController')
const settingsController = require('./controllers/settingsController')

// auth
router.post('/login', authController.login)
router.post('/signup', authController.signup)
router.get('/verify', authController.verify)

router.use(checkUser)

// user
router.get('/logout', userController.logout)

router.post('/note', userController.createNote)
router.patch('/note', userController.editNote)
router.delete('/note', userController.removeNote)

router.patch('/share-note', userController.shareNote)
router.patch('/unlink-note', userController.unlinkNote)

router.post('/notes', userController.getNotes)

// settings
router.patch('/theme', settingsController.toggleTheme)

router.patch('/start-encryption', settingsController.startEncryption)
router.patch('/change-pin', settingsController.changePin)

router.patch('/change-password', settingsController.changePassword)

module.exports = router