const User = require('../schemas/UserSchema')
const PasswordRecovery = require('../schemas/PasswordRecovery')
const jwt = require('jsonwebtoken')
const findUserByToken = require('../middlewares/findUserByToken')
const errorHandler = require('../middlewares/errorHandler')
const checkRequirements = require('../middlewares/checkRequirements')
const sendRecoverMail = require('../middlewares/sendRecoverMail')
const { isEmail } = require('validator')

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
    const { username, password, mail } = req.body

    try {
        checkRequirements(password)
        if (mail && !isEmail(mail)) throw Error('invalid email EXERR')

        const data = { password }

        if (mail) {
            if (!isEmail(mail)) throw Error('invalid email EXERR')

            data.mail = mail
        }
        data.username = username || `user:${Math.floor(Math.random() * 10000000)}`

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

module.exports.sendRecoverMail = async (req, res, next) => {
    const mail = req.body.mail

    try {
        checkRequirements(mail)
        const user = await User.findOne({ mail })
        if (!user) throw new Error("User with this mail doesn't exists")

        const { _id } = await PasswordRecovery.create({ mail })

        const isSent = await sendRecoverMail(mail, _id)
        if (isSent) res.status(200).json('success')
        else throw new Error('something went wrong')
    }
    catch (err) {
        next(err)
    }

}
module.exports.passwordRecover = async (req, res, next) => {
    const id = req.body.id
    const password = req.body.password

    try {
        checkRequirements(id, password)

        const isIdCorrect = await PasswordRecovery.exists({ _id: id })
        if (!isIdCorrect) throw new Error('Password recovery request probably expired, try again EXERR')

        if (password.length < 8) throw new Error('short password')
        if (password.length > 32) throw new Error('long password')

        const { mail } = await PasswordRecovery.findOneAndRemove(id)
        const user = await User.findOne({ mail })

        await User.changePassword(password, user._id)
        user.password = null
        res.status(200).json(user)
    }
    catch (err) {
        errorHandler(err, next)
    }

}