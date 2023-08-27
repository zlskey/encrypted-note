import { ErrorObject } from './error.middleware'
import { RequestHandler } from 'express'
import constants from '../constants'
import { jwtUtils } from '../utils'
import mongoose from 'mongoose'

declare global {
    namespace Express {
        interface Request {
            userId?: mongoose.Types.ObjectId
        }
    }
}

const authorizeCookie: RequestHandler = (req, res, next) => {
    const jwt = req.cookies.jwt

    const token = jwtUtils.validateToken(jwt)

    if (!token) {
        return next(new ErrorObject(constants.invalid_auth, 401))
    }

    if (typeof token !== 'string') req.userId = token._id

    next()
}

export default authorizeCookie
