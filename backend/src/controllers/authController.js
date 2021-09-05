const User = require('../schemas/UserSchema')
const jwt = require('jsonwebtoken')
const findUserByToken = require('../middlewares/findUserByToken')
const errorHandler = require('../middlewares/errorHandler')
const checkRequirements = require('../middlewares/checkRequirements')

const maxAge = 7 * 24 * 60 * 60
const createToken = (id, dontLogout = false) => {
    const options = dontLogout
        ? {}
        : { expiresIn: maxAge }

    return jwt.sign({ id }, process.env.JWT_SECRET, options)
}

const getCookieOptions = (dontLogout = false) => {
    return dontLogout
        ? {
            httpOnly: true,
            secure: true,
        }
        : {
            httpOnly: true,
            secure: true,
            maxAge: maxAge * 1000,
        }
}

module.exports.signup = async (req, res, next) => {
    const { username, password } = req.body

    try {
        checkRequirements(password)

        const data =
            username
                ? { username, password }
                : { username: `user:${Math.floor(Math.random() * 10000000)}`, password }

        const user = await User.create(data)
        const token = createToken(user._id)
        user.password = null

        res
            .cookie('jwt', token, getCookieOptions())
            .status(201)
            .json(user)
    }
    catch (err) {
        errorHandler(err, next)
    }

}

module.exports.login = async (req, res, next) => {
    const { login, password, dontLogout } = req.body

    try {
        checkRequirements(login, password)

        const user = await User.login(login, password)
        const token = createToken(user._id, dontLogout)
        user.password = null

        console.log(getCookieOptions(dontLogout))

        res
            .cookie('jwt', token, getCookieOptions(dontLogout))
            .status(201)
            .json(user)
    }
    catch (err) {
        errorHandler(err, next)
    }

}

module.exports.verify = async (req, res, next) => {
    try {
        const user = await findUserByToken(req)

        if (user) {
            user.password = null
            res.status(201).json(user)
        }
        else res.status(201).json(false)
    }
    catch (err) {
        errorHandler(err, next)
    }
}
