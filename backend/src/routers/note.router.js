const router = require('express').Router()
const noteController = require('../controllers/note.controller')

router.post('/', noteController.create)
router.patch('/', noteController.edit)
router.delete('/', noteController.remove)

router.patch('/share', noteController.share)
router.patch('/unlink', noteController.unlink)

module.exports = router
