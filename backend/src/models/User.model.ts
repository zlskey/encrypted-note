import { keysService, noteService } from 'src/services'

import { ErrorObject } from 'src/middlewares/error.middleware'
import _ from 'lodash'
import bcrypt from 'bcrypt'
import constants from 'src/constants'
import mongoose from 'mongoose'
import { pgpUtils } from 'src/utils'

export interface IUser {
    _id: mongoose.Types.ObjectId

    username: string
    password: string
    encryption: boolean

    removePassword(): Omit<IUser, 'password'>
    validatePassword(this: IUser, password: string): Promise<void>
    changePassword(this: IUser, password: string): Promise<void>
    startEncryption(this: IUser, passphrase: string): Promise<void>
    changePassphrase(
        this: IUser,
        current: string,
        newPassphrase: string
    ): Promise<void>
}

const userSchema = new mongoose.Schema<IUser>({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
    },
    encryption: {
        type: Boolean,
        default: false,
    },
})

userSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt()
    this.password = await bcrypt.hash(this.password, salt)

    next()
})

class UserClass {
    async validatePassword(this: IUser, password: string): Promise<void> {
        const isValid = await bcrypt.compare(password, this.password)

        if (isValid) return

        throw new ErrorObject(constants.invalid_password, 401)
    }

    async changePassword(
        this: IUser,
        password: IUser['password']
    ): Promise<void> {
        const salt = await bcrypt.genSalt()
        const newPassword = (password = await bcrypt.hash(password, salt))

        await User.findByIdAndUpdate(this._id, { password: newPassword })
    }

    async startEncryption(this: IUser, passphrase: string): Promise<void> {
        if (this.encryption) {
            throw new ErrorObject(constants.start_encryption_duplicate)
        }

        if (!passphrase) {
            throw new ErrorObject(constants.no_passphrase)
        }

        const keys = await pgpUtils.generateKeys(this.username, passphrase)

        await keysService.save(this._id, keys.privateKey, keys.publicKey)

        const notes = await noteService.getAll(this._id)

        for (const note of notes) {
            await note.encrypt(this._id)
        }

        await User.findByIdAndUpdate(this._id, { encryption: true })
    }

    async changePassphrase(
        this: IUser,
        current: string,
        newPassphrase: string
    ): Promise<void> {
        if (!current || !newPassphrase) {
            throw new ErrorObject(constants.no_passphrase)
        }

        const notes = await noteService.getAll(this._id)

        for (const note of notes) {
            await note.decrypt(current, this._id)
        }

        const keyChain = await pgpUtils.generateKeys(
            this.username,
            newPassphrase
        )

        await keysService.update(
            this._id,
            keyChain.privateKey,
            keyChain.publicKey
        )

        for (const note of notes) {
            await note.encrypt()
        }
    }

    removePassword(this: IUser): Omit<IUser, 'password'> {
        return _.omit(this, 'password')
    }
}

userSchema.loadClass(UserClass)

const User = mongoose.model<IUser>('Users', userSchema)

export default User
