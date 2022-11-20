import { keysService, noteService } from 'src/services'

import { IUser } from './User.model'
import _ from 'lodash'
import mongoose from 'mongoose'
import { pgpUtils } from 'src/utils'

type stringOrObjectId = string | mongoose.Types.ObjectId

export interface INote extends mongoose.Document {
    _id: mongoose.Types.ObjectId

    authorId: IUser['_id']
    recipients: IUser['_id'][]
    title: string
    content: string

    encrypt(this: INote, ...userIds: stringOrObjectId[]): Promise<INote>
    decrypt(
        this: INote,
        passphrase: string,
        userId: mongoose.Types.ObjectId
    ): Promise<INote>
    share(this: INote, username: string): Promise<INote>
    parseRecipients(this: INote): Promise<INote>
}

const noteSchema = new mongoose.Schema<INote>(
    {
        authorId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
        recipients: [
            {
                type: mongoose.Schema.Types.ObjectId,
            },
        ],
        title: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
)

class NoteClass {
    async encrypt(this: INote): Promise<INote> {
        const userIds = [this.authorId, ...this.recipients]
        const encryptionKeys = await keysService.getPublicKeys(...userIds)
        const encryptedContent = await pgpUtils.encrypt(
            this.content,
            encryptionKeys
        )

        await noteService.update(this, { content: encryptedContent })

        return this
    }

    async decrypt(
        this: INote,
        passphrase: string,
        userId: mongoose.Types.ObjectId
    ): Promise<INote> {
        const decryptionKey = await keysService.getPrivateKey(
            userId,
            passphrase
        )
        const decrypted = await pgpUtils.decrypt(this.content, decryptionKey)

        this['content'] = decrypted

        return this
    }
}

noteSchema.loadClass(NoteClass)

const Note = mongoose.model<INote>('notes', noteSchema)

export default Note
