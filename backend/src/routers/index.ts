import { authMiddleware, timeoutMiddleware } from '../middlewares'

import { Router } from 'express'
import authRouter from './auth.router'
import noteRouter from './note.router'
import userRouter from './user.router'

const router = Router()

router.use('/', authRouter)
router.use('/user', authMiddleware, timeoutMiddleware, userRouter)
router.use('/note', authMiddleware, timeoutMiddleware, noteRouter)

export default router
