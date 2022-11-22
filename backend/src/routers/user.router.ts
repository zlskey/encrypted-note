import { Router } from 'express'
import { userController } from '../controllers'
import { wrapAsync } from '../utils'

const userRouter = Router()

userRouter.patch('/password', wrapAsync(userController.changePassword))
userRouter.patch('/start-encryption', wrapAsync(userController.startEncryption))
userRouter.patch('/passphrase', wrapAsync(userController.changePassphrase))
userRouter.get('/key-chain', wrapAsync(userController.getKeyChain))
userRouter.patch('/username', wrapAsync(userController.changeUsername))
userRouter.patch('/timeout', wrapAsync(userController.toggleTimeout))
userRouter.patch('/light-mode', wrapAsync(userController.toggleLightMode))
userRouter.get(
    '/validate-passphrase',
    wrapAsync(userController.validatePassphrase)
)

export default userRouter
