import * as openpgp from 'openpgp'

import Key, { IKey } from 'src/models/Key.model'

import { ErrorObject } from '../middlewares/error.middleware'
import { IUser } from 'src/models/User.model'
import constants from '../constants'
import mongoose from 'mongoose'
import { pgpUtils } from 'src/utils'

export const get = async (userId: IUser['_id']) => {
    const key = await Key.findOne({ ownerId: userId })

    if (!key) {
        throw new ErrorObject(constants.key_not_found)
    }

    return key
}

export const getPublicKeys = async (
    ...recipients: (string | IUser['_id'])[]
): Promise<openpgp.Key[]> => {
    const userIds: IUser['_id'][] = []

    for (const recipient of recipients) {
        if (mongoose.isValidObjectId(recipient)) {
            userIds.push(new mongoose.Types.ObjectId(recipient))
            continue
        }

        throw new ErrorObject(constants.key_not_found)
    }

    const keys = await Promise.all(
        userIds.flatMap(async userId => {
            const keyChain = await get(userId)

            const publicKey = await pgpUtils.readPublicKey(keyChain.publicKey)

            return publicKey
        })
    )

    return keys
}

export const getPrivateKey = async (
    userId: IUser['_id'],
    passphrase: string
) => {
    const keyChain = await get(userId)

    await pgpUtils.validatePassphrase(keyChain.privateKey, passphrase)

    const privateKey = await pgpUtils.readPrivateKey(
        keyChain.privateKey,
        passphrase
    )

    return privateKey
}

export const remove = async (key: IKey) => {
    return await Key.findOneAndRemove(key._id)
}

export const update = async (userId: IUser['_id'], privateKey, publicKey) => {
    return await Key.findOneAndUpdate(
        { ownerId: userId },
        { privateKey, publicKey },
        { new: true }
    )
}

export const save = async (userId: IUser['_id'], privateKey, publicKey) => {
    return await Key.create({ ownerId: userId, privateKey, publicKey })
}
