const Note = require("..//schemas/NoteSchema")
// const User = require("..//schemas/UserSchema")
const pgpHandler = require("../middlewares/pgpHandler")
const errorHandler = require("../middlewares/errorHandler")
const checkRequirements = require("../middlewares/checkRequirements")

module.exports.getNotes = async (req, res, next) => {
    const pin = req.body.pin

    try {
        const { username, encryption } = req.user
        const userNotesFromDb = await Note.find({ author: username })
        const sharedNotesFromDb = await Note.find({ recipients: username })

        const output = {
            userNotes: [],
            sharedNotes: [],
        }

        if (!encryption) output.userNotes = userNotesFromDb
        else {
            checkRequirements(pin)
            output.userNotes = await pgpHandler.decryptNotes(userNotesFromDb, username, pin)
            if (sharedNotesFromDb.length) {
                output.sharedNotes = await pgpHandler.decryptNotes(sharedNotesFromDb, username, pin)
            }
        }

        res.status(201).json({ content: output })
    } catch (err) { errorHandler(err, next) }
}

module.exports.logout = (req, res) => {
    res
        .cookie("jwt", null, { maxAge: 1, })
        .status(201)
        .json({ content: true, })
}
