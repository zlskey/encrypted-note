import { RequestHandler } from 'express'
import { userService } from 'src/services'

const timeoutMiddleware: RequestHandler = async (req, res, next) => {
    const user = await userService.getById(req.userId)

    setTimeout(next, user.timeout ? 500 : 0)
}

export default timeoutMiddleware
