import { Router } from 'express'
import { userController } from '../controllers'
import { wrapAsync } from '../utils'

const userRouter = Router()

userRouter.patch('/change-password', wrapAsync(userController.changePassword))
userRouter.patch('/start-encryption', wrapAsync(userController.startEncryption))
userRouter.patch(
    '/change-passphrase',
    wrapAsync(userController.changePassphrase)
)
userRouter.get('/key-chain', wrapAsync(userController.getKeyChain))
userRouter.get(
    '/validate-passphrase',
    wrapAsync(userController.validatePassphrase)
)

export default userRouter
