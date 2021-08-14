const Note = require('../schemas/NoteSchema')
const User = require('../schemas/UserSchema')
const Key = require('../schemas/KeySchema')
const pgpHandler = require('../middlewares/pgpHandler')
const errorHandler = require('../middlewares/errorHandler')
const checkRequirements = require('../middlewares/checkRequirements')

module.exports.toggleTheme = async (req, res, next) => {
    try {
        const user = req.user
        const theme = user.theme === 'light' ? 'dark' : 'light'

        await User.findOneAndUpdate({ username: req.user.username }, { theme })
        res.status(201).json({ content: true })
    }
    catch (err) { errorHandler(err, next) }
}

module.exports.startEncryption = async (req, res, next) => {
    const { username, encryption, _id } = req.user
    const pin = req.body.pin

    try {
        if (encryption) throw Error('Already have encryption')
        checkRequirements(pin)

        await pgpHandler.generateKeys(username, pin)
        const user = await User.findByIdAndUpdate(_id, { encryption: true })

        const notes = await Note.find({ author: username })
        if (notes) pgpHandler.encryptNotes(notes, username)

        res.status(201).json({ content: user })
    }
    catch (err) { errorHandler(err, next) }
}

module.exports.changePin = async (req, res, next) => {
    const { currentPin, newPin } = req.body
    const { username } = req.user

    try {
        checkRequirements(currentPin, newPin)

        await pgpHandler.readPrivateKey(username, currentPin) // to check if pin is correct

        const notesFromDB = await Note.find({ author: username })
        const decryptedNotes =
            notesFromDB
                ? await pgpHandler.decryptNotes(notesFromDB, username, currentPin)
                : null

        await Key.findOneAndRemove({ username })
        await pgpHandler.generateKeys(username, newPin)

        if (decryptedNotes) await pgpHandler.encryptNotes(decryptedNotes, username)

        res.status(200).json({ content: true })
    }
    catch (err) { errorHandler(err, next) }
}

module.exports.changePassword = async (req, res, next) => {
    const { currentPassword, newPassword } = req.body
    const { username, _id } = req.user

    try {
        checkRequirements(currentPassword, newPassword)

        await User.login(username, currentPassword) // to check if password is correct
        const user = await User.changePassword(newPassword, _id)

        res.status(200).json({ content: user })
    }
    catch (err) { errorHandler(err, next) }
}