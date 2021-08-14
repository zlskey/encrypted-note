const router = require('express').Router()
const authController = require('../controllers/authController')

router.post('/login', authController.login)
router.post('/signup', authController.signup)
router.get('/verify', authController.verify)

module.exports = router