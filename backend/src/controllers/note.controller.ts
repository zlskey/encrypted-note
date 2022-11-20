import { noteService, userService } from 'src/services'

import { ErrorObject } from 'src/middlewares/error.middleware'
import { RequestHandler } from 'express'
import constants from 'src/constants'

export const create: RequestHandler = async (req, res, next) => {
    const { title, content } = req.body

    const user = await userService.getById(req.userId)
    const note = await noteService.create(user._id, title, content)

    if (user.encryption) {
        await note.encrypt()
    }

    res.status(202).json(note)
}

export const get: RequestHandler = async (req, res, next) => {
    const { id, passphrase } = req.query

    const parsedPassphrase = passphrase?.toString() || ''

    if (!id) {
        const notes = await noteService.getAll(req.userId, parsedPassphrase)

        res.status(200).json(notes)
        return
    }

    const user = await userService.getById(req.userId)
    const note = await noteService.getById(
        id.toString(),
        user._id,
        parsedPassphrase
    )

    res.status(200).json(note)
}

export const update: RequestHandler = async (req, res, next) => {
    const { noteId, title, content } = req.body

    const user = await userService.getById(req.userId)
    const note = await noteService.getById(noteId, req.userId)
    const updatedNote = await noteService.update(note, { title, content })

    if (user.encryption) {
        await updatedNote.encrypt(req.userId.toString(), ...note.recipients)
    }

    res.status(200).json(updatedNote)
}

export const share: RequestHandler = async (req, res, next) => {
    const { username, noteId, content } = req.body

    const user = await userService.getById(req.userId)
    const note = await noteService.getById(noteId, req.userId)
    const recipient = await userService.getByUsername(username)

    if (!user.encryption) {
        throw new ErrorObject(constants.share_author_no_encryption)
    }

    if (note.authorId.equals(recipient._id)) {
        throw new ErrorObject(constants.share_author)
    }

    if (note.recipients.includes(recipient._id)) {
        throw new ErrorObject(constants.share_duplicate)
    }

    if (!recipient.encryption) {
        throw new ErrorObject(constants.share_recipient_no_encryption)
    }

    const updatedNote = await noteService.update(note, {
        recipients: [...note.recipients, recipient._id],
        content,
    })
    await updatedNote.encrypt()

    res.json(updatedNote)
}

export const unshare: RequestHandler = async (req, res, next) => {
    const { username, noteId, content } = req.body

    const note = await noteService.getById(noteId, req.userId)
    const recipient = await userService.getByUsername(username)

    if (!note.recipients.includes(recipient._id)) {
        throw new ErrorObject(constants.share_invalid_recipient)
    }

    const updatedNote = await noteService.update(note, {
        recipients: note.recipients.filter(
            userId => !userId.equals(recipient._id)
        ),
        content,
    })

    await updatedNote.encrypt()

    res.json(updatedNote)
}

export const getRecipients: RequestHandler = async (req, res, next) => {
    const { noteId } = req.query

    const note = await noteService.getById(noteId.toString(), req.userId)

    const recipients = []

    for (const userId of note.recipients) {
        const user = await userService.getById(userId)

        recipients.push(user.username)
    }

    res.json(recipients)
}

export const remove: RequestHandler = async (req, res, next) => {
    const { _id } = req.query

    const note = await noteService.getById(_id.toString(), req.userId)

    await noteService.remove(note)

    res.status(200).json('success')
}
