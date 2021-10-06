const Note = require('../models/Note.model')
const User = require('../models/User.model')
const Key = require('../models/Key.model')
const pgpHandler = require('../middlewares/pgpHandler')
const checkRequirements = require('../middlewares/checkRequirements')

module.exports.toggleTheme = async (req, res, next) => {
    try {
        const user = req.user
        const theme = user.theme === 'light' ? 'dark' : 'light'

        await User.findOneAndUpdate({ username: req.user.username }, { theme })
        res.status(201).json(theme)
    } catch (err) {
        next(err)
    }
}

module.exports.startEncryption = async (req, res, next) => {
    const { username, encryption, _id } = req.user
    const pin = req.body.pin

    try {
        if (encryption) throw Error('Already have encryption')
        if (pin.length !== 4) throw Error('Pin must have 4 characters EXERR')
        checkRequirements(pin)

        await pgpHandler.generateKeys(username, pin)
        await User.findByIdAndUpdate(_id, { encryption: true })

        const notes = await Note.find({ author: username })
        if (notes) pgpHandler.encryptNotes(notes, username)

        req.user.encryption = true

        res.status(201).json(req.user)
    } catch (err) {
        next(err)
    }
}

module.exports.changePin = async (req, res, next) => {
    const { currentPin, newPin } = req.body
    const { username } = req.user

    try {
        checkRequirements(currentPin, newPin)
        if (newPin.length !== 4) throw Error('Pin must have 4 characters EXERR')

        await pgpHandler.readPrivateKey(username, currentPin) // to check if pin is correct

        const notesFromDB = await Note.find({ author: username })
        const decryptedNotes = notesFromDB
            ? await pgpHandler.decryptNotes(notesFromDB, username, currentPin)
            : null

        await Key.findOneAndRemove({ username })
        await pgpHandler.generateKeys(username, newPin)

        if (decryptedNotes)
            await pgpHandler.encryptNotes(decryptedNotes, username)

        res.status(200).json(true)
    } catch (err) {
        next(err)
    }
}

module.exports.changePassword = async (req, res, next) => {
    const { currentPassword, newPassword } = req.body
    const { username, _id } = req.user

    try {
        checkRequirements(currentPassword, newPassword)

        if (newPassword.length < 8) throw Error('short password')
        if (newPassword.length > 32) throw Error('long password')

        await User.login(username, currentPassword) // to check if password is correct
        const user = await User.changePassword(newPassword, _id)

        res.status(200).json(user)
    } catch (err) {
        next(err)
    }
}
