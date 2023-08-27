import Note, { INote } from 'src/models/Note.model'

import { ErrorObject } from '../middlewares/error.middleware'
import { IUser } from 'src/models/User.model'
import constants from '../constants'
import { isValidObjectId } from 'mongoose'

export const getAll = async (userId: IUser['_id'], passphrase?: string) => {
    const notes = await Note.find({
        $or: [
            { authorId: userId },
            { recipients: { $in: [userId.toString()] } },
        ],
    })

    if (!Boolean(passphrase)) return notes

    const formattedNotes = await Promise.all(
        notes.map(async (note: INote) => await note.decrypt(passphrase, userId))
    )

    return formattedNotes
}

export const getById = async (
    _id: string,
    userId: IUser['_id'],
    passphrase?: string
) => {
    if (isValidObjectId(_id) === false) {
        throw new ErrorObject(constants.note_not_found)
    }

    const note = await Note.findById(_id)

    if (!note) {
        throw new ErrorObject(constants.note_not_found)
    }
    if (
        !note.recipients.includes(userId) &&
        note.authorId.toString() !== userId.toString()
    ) {
        throw new ErrorObject(constants.note_not_found)
    }

    if (!Boolean(passphrase)) {
        return note
    }

    return await note.decrypt(passphrase, userId)
}

export const remove = async (note: INote) => {
    return await Note.findByIdAndDelete(note._id)
}

export const update = async (note: INote, payload: any) => {
    return await Note.findByIdAndUpdate(note._id, payload, { new: true })
}

export const create = async (
    userId: IUser['_id'],
    title: string,
    content: string
) => {
    if (!content || !title) {
        throw new ErrorObject(constants.missing_args)
    }

    const note = await Note.create({ title, content, authorId: userId })

    return note
}
