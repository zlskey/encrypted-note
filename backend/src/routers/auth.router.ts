import { Router } from 'express'
import { authController } from '../controllers'
import { authMiddleware } from '../middlewares'
import wrapAsync from '../utils/wrapAsync'

const router = Router()

router.post('/signup', wrapAsync(authController.signup))
router.post('/login', wrapAsync(authController.login))
router.delete('/logout', authMiddleware, wrapAsync(authController.logout))

router.get('/whoami', wrapAsync(authController.whoami))

export default router
