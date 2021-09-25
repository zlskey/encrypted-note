const router = require('express').Router()
const settingsController = require('../controllers/settingsController')

router.patch('/theme', settingsController.toggleTheme)
router.patch('/start-encryption', settingsController.startEncryption)
router.patch('/change-pin', settingsController.changePin)
router.patch('/change-password', settingsController.changePassword)

module.exports = router
