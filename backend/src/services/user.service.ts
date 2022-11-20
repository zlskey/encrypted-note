import User, { IUser } from '../models/User.model'

import { ErrorObject } from '../middlewares/error.middleware'
import _ from 'lodash'
import constants from '../constants'

export const create = async (
    username: string,
    password: string
): Promise<Omit<IUser, 'password'>> => {
    try {
        if (!username || !password) {
            throw new ErrorObject(constants.missing_args)
        }

        const user = await User.create({ username, password })

        return user.removePassword()
    } catch (err: any) {
        if (err?.code === 11000) {
            throw new ErrorObject(constants.username_duplicate)
        }

        throw err
    }
}

export const getByUsername = async (
    username: IUser['username']
): Promise<IUser> => {
    const user = await User.findOne({ username })

    if (!user) {
        throw new ErrorObject(constants.invalid_username, 401)
    }

    return user
}

export const getById = async (id: IUser['_id'] | string): Promise<IUser> => {
    const user = await User.findById(id)

    if (!user) {
        throw new ErrorObject(constants.invalid_username, 401)
    }

    return user
}

export const remove = async (username: IUser['username']): Promise<void> => {
    await User.findOneAndDelete({ username })
}

export const update = async (username: IUser['username']): Promise<void> => {}
