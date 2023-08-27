import { RequestHandler } from 'express'
import { jwtUtils } from '../utils'
import { userService } from '../services'

const getMaxAge = remember => {
    const oneDay = 1000 * 60 * 60 * 24

    return remember ? oneDay * 365 : oneDay
}

const getCookieOptions = remember => ({
    httpOnly: true,
    secure: true,
    maxAge: getMaxAge(remember),
})

export const signup: RequestHandler = async (req, res, next) => {
    const { username, password, remember } = req.body
    const maxAge = getMaxAge(remember) / 1000
    const user = await userService.create(username, password)
    const token = jwtUtils.createToken(user._id, maxAge)

    res.cookie('jwt', token, getCookieOptions(remember)).json(user)
}

export const login: RequestHandler = async (req, res, next) => {
    const { username, password, remember } = req.body

    const user = await userService.getByUsername(username)

    await user.validatePassword(password)

    const maxAge = getMaxAge(remember) / 1000
    const token = jwtUtils.createToken(user._id, maxAge)

    res.cookie('jwt', token, getCookieOptions(remember)).json(user)
}

export const whoami: RequestHandler = async (req, res, next) => {
    const jwt = req.cookies.jwt

    const token = jwtUtils.validateToken(jwt)

    if (!token) {
        res.json(null)
        return
    }

    const user = await userService.getById(token._id)

    res.json(user)
}

export const logout: RequestHandler = async (req, res, next) => {
    res.clearCookie('jwt').status(200).end()
}
