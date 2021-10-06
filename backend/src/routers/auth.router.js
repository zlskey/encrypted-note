const router = require('express').Router()
const authController = require('../controllers/auth.controller')

router.post('/login', authController.login)
router.post('/signup', authController.signup)
router.get('/verify', authController.verify)

router.post('/send-recover-mail', authController.sendRecoverMail)
router.post('/password-recover', authController.passwordRecover)
module.exports = router
