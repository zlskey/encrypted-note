import * as userActions from 'src/reducers/user.reducer'

import { Dispatch } from 'redux'
import HttpService from './http.service'
import IUser from 'src/types/IUser'

interface InitData {
    username: string
    password: string
    remember: boolean
}

export default class UserService {
    constructor(private dispatch: Dispatch, private httpService: HttpService) {}

    async signUp(data: InitData): Promise<void> {
        const res = await this.httpService.post('signup', data)

        const action = userActions.setUserData(res.data)

        this.dispatch(action)
    }

    async login(data: InitData): Promise<IUser> {
        const res = await this.httpService.post('login', data)

        const action = userActions.setUserData(res.data)

        this.dispatch(action)

        return res.data
    }

    async logout(): Promise<void> {
        await this.httpService.delete('logout')

        const action = userActions.logout()

        this.dispatch(action)
    }

    async authorize(): Promise<void> {
        const res = await this.httpService.get('whoami')

        if (!res.data) {
            return
        }

        const action = userActions.setUserData(res.data)

        this.dispatch(action)
    }

    async validatePassphrase(passphrase: string): Promise<boolean> {
        const res = await this.httpService.get('user/validate-passphrase', {
            passphrase,
        })

        return res.data
    }

    async changePassword(
        currentPassword: string,
        newPassword: string
    ): Promise<void> {
        await this.httpService.patch('user/password', {
            currentPassword,
            newPassword,
        })
    }

    async changePassphrase(
        currentPassphrase: string,
        newPassphrase: string
    ): Promise<void> {
        await this.httpService.patch('user/passphrase', {
            currentPassphrase,
            newPassphrase,
        })
    }

    async startEncryption(passphrase: string): Promise<void> {
        await this.httpService.patch('user/start-encryption', { passphrase })

        const action = userActions.enableEncryption()

        this.dispatch(action)
    }

    async changeUsername(username: string): Promise<void> {
        const res = await this.httpService.patch('user/username', { username })

        const action = userActions.setUserData(res.data)

        this.dispatch(action)
    }

    async toggleLightMode(): Promise<void> {
        const res = await this.httpService.patch('user/light-mode', {})

        const action = userActions.setUserData(res.data)

        this.dispatch(action)
    }

    async toggleTimeout(): Promise<void> {
        const res = await this.httpService.patch('user/timeout', {})

        const action = userActions.setUserData(res.data)

        this.dispatch(action)
    }
}
