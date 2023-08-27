import { Router } from 'express'
import { noteController } from 'src/controllers'
import { wrapAsync } from '../utils'

const noteRouter = Router()

noteRouter.get('/', wrapAsync(noteController.get))
noteRouter.post('/', wrapAsync(noteController.create))
noteRouter.delete('/', wrapAsync(noteController.remove))
noteRouter.patch('/', wrapAsync(noteController.update))
noteRouter.patch('/share', wrapAsync(noteController.share))
noteRouter.patch('/unshare', wrapAsync(noteController.unshare))
noteRouter.get('/recipients', wrapAsync(noteController.getRecipients))

export default noteRouter
