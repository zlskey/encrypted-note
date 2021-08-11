const Note = require('../schemas/NoteSchema')
const User = require('../schemas/UserSchema')
const pgpHandler = require('../middlewares/pgpHandler')
const errorHandler = require('../middlewares/errorHandler')
const checkRequirements = require('../middlewares/checkRequirements')

module.exports.createNote = async (req, res, next) => {
    try {
        const { username, encryption } = req.user
        const content = req.body.content

        checkRequirements(content)

        const output =
            encryption
                ? await pgpHandler.encrypt(content, username)
                : content

        const note = await Note.create({ author: username, content: output })
        note.content = content

        res.status(201).json({ content: note })
    }
    catch (err) { errorHandler(err, next) }
}

module.exports.editNote = async (req, res, next) => {
    try {
        const { username, encryption } = req.user
        const { id, content } = req.body

        checkRequirements(id, content)

        const output =
            encryption
                ? await pgpHandler.encrypt(content, username)
                : content

        const note = await Note.findOneAndUpdate({ _id: id, author: username }, { content: output })

        res.status(201).json({ content: true })
    }
    catch (err) { errorHandler(err, next) }
}

module.exports.getNotes = async (req, res, next) => {
    const pin = req.body.pin

    try {
        const { username, encryption } = req.user
        const userNotesFromDb = await Note.find({ author: username })
        const sharedNotesFromDb = await Note.find({ recipients: username })

        const output = {
            userNotes: [],
            sharedNotes: []
        }

        if (!encryption) output.userNotes = userNotesFromDb
        else {
            checkRequirements(pin)
            output.userNotes = await pgpHandler.decryptNotes(userNotesFromDb, username, pin)
            if (sharedNotesFromDb.length) output.sharedNotes = await pgpHandler.decryptNotes(sharedNotesFromDb, username, pin)
        }

        res.status(201).json({ content: output })
    }
    catch (err) { errorHandler(err, next) }
}

module.exports.removeNote = async (req, res, next) => {
    const _id = req.body.id
    const { username } = req.user

    try {
        checkRequirements(_id)
        await Note.findOneAndRemove({ author: username, _id })

        res.status(201).json({ content: true })
    }
    catch (err) { errorHandler(err, next) }
}

module.exports.shareNote = async (req, res, next) => {
    const { id, recipient, content } = req.body
    const { username } = req.user

    try {
        checkRequirements(id, recipient, content)

        const note = await Note.findById(id)

        const { author, recipients } = note

        if (username !== note.author) throw Error(`You're not the author EXERR`)
        if (recipients.includes(recipient)) throw Error(`${recipient} is already recipient of this note EXERR`)

        const recipientData = await User.findOne({ username: recipient })
        if (!recipientData) throw Error(`User ${recipient} doesn't exists EXERR`)
        else if (!recipientData.encryption) throw Error(`User ${recipient} don't have encryption active EXERR`)

        const usernames = [...recipients, author, recipient]
        const encryptedContent = await pgpHandler.encrypt(content, ...usernames)
        const output = await Note.findByIdAndUpdate(id, { recipients: [...recipients, recipient], content: encryptedContent })
        res.status(201).json({ content: output.recipients })
    }
    catch (err) { errorHandler(err, next) }

}

module.exports.unlinkNote = async (req, res, next) => {
    const { id, content } = req.body
    const { username } = req.user

    try {
        checkRequirements(id, content)

        const note = await Note.findById(id)
        const isAuthor = note.author === username

        if (isAuthor) checkRequirements(req.body.recipientToUnlink)
        const recipientToUnlink = isAuthor ? req.body.recipientToUnlink : username

        const recipients = note.recipients.filter(user => user !== recipientToUnlink)

        const encryptedContent = await pgpHandler.encrypt(content, note.author, ...recipients)

        const output = await Note.findByIdAndUpdate(id, { recipients, content: encryptedContent })
        const content = isAuthor ? output.recipients : true
        res.status(201).json({ content })
    }
    catch (err) { errorHandler(err, next) }

}

module.exports.logout = (req, res) => {
    const cookie = {
        action: 'eat',
        name: 'jwt',
        value: null,
        options: {
            // httpOnly: true,
            maxAge: 1
        }
    }

    res.status(201).json({ content: true, cookie })
}