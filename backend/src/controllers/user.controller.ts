import { keysService, userService } from 'src/services'

import { RequestHandler } from 'express'
import _ from 'lodash'
import { pgpUtils } from 'src/utils'

export const changePassword: RequestHandler = async (req, res, next) => {
    const { currentPassword, newPassword } = req.body

    const user = await userService.getById(req.userId)

    await user.validatePassword(currentPassword)
    await user.changePassword(newPassword)

    res.status(202).json('success')
}

export const startEncryption: RequestHandler = async (req, res, next) => {
    const { passphrase } = req.body

    const user = await userService.getById(req.userId)

    await user.startEncryption(passphrase)

    res.status(202).json('success')
}

export const changePassphrase: RequestHandler = async (req, res, next) => {
    const { currentPassphrase, newPassphrase } = req.body

    const user = await userService.getById(req.userId)

    await user.changePassphrase(currentPassphrase, newPassphrase)

    res.status(202).json('success')
}

export const getKeyChain: RequestHandler = async (req, res, next) => {
    const keyChain = await keysService.get(req.userId)

    res.status(200).json(_.omit(keyChain, 'ownerId'))
}

export const validatePassphrase: RequestHandler = async (req, res, next) => {
    const { passphrase } = req.query

    if (!passphrase) {
        res.status(200).json(false)
    }

    const keys = await keysService.get(req.userId)
    const isValid = await pgpUtils.validatePassphrase(
        keys.privateKey,
        passphrase.toString()
    )

    res.status(202).json(isValid)
}
