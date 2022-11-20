import { Router } from 'express'
import { authMiddleware } from '../middlewares'
import authRouter from './auth.router'
import noteRouter from './note.router'
import userRouter from './user.router'

const router = Router()

router.use('/', authRouter)
router.use('/user', authMiddleware, userRouter)
router.use('/note', authMiddleware, noteRouter)

export default router
