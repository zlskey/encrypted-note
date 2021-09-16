const router = require('express').Router()
const userController = require('../controllers/userController')

router.get('/logout', userController.logout)
router.post('/notes', userController.getNotes)
router.post('/mail', userController.setMail)


module.exports = router