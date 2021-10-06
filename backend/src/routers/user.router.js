const router = require('express').Router()
const userController = require('../controllers/user.controller')

router.get('/logout', userController.logout)
router.post('/notes', userController.getNotes)
router.post('/mail', userController.setMail)

module.exports = router
