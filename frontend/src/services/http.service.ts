import axios from 'axios'
import constants from 'src/constants'
import { setAlert } from 'src/contexts/AlertContext'

const API_URL = process.env.REACT_APP_API_URL

const options = {
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': API_URL,
        credentials: 'same-origin',
    },
}

export default class HttpService {
    constructor(
        private setAlert: setAlert,
        private setIsLoading: (value: boolean) => void
    ) {}

    private async handleFetch(fun: () => Promise<any>) {
        try {
            this.setIsLoading(true)
            const data = await fun()
            this.setIsLoading(false)

            return data
        } catch (err: any) {
            this.setIsLoading(false)

            if (
                err.code === 'ERR_NETWORK' ||
                !err?.response ||
                err.response.status === 500
            ) {
                this.setAlert(constants.error.network)
                console.log(constants.error.network)
                throw Error(err)
            }

            this.setAlert(err.response.data.error.message)

            throw Error()
        }
    }

    public async get(url: string, payload?: any) {
        const params = new URLSearchParams(payload)

        return this.handleFetch(
            async () => await axios.get(`${API_URL}/${url}?${params}`, options)
        )
    }

    public async delete(url: string, payload?: any) {
        const params = new URLSearchParams(payload)

        return this.handleFetch(
            async () =>
                await axios.delete(`${API_URL}/${url}?${params}`, options)
        )
    }

    public async post(url: string, payload?: any) {
        return this.handleFetch(
            async () => await axios.post(`${API_URL}/${url}`, payload, options)
        )
    }

    public async patch(url: string, payload?: any) {
        return this.handleFetch(
            async () => await axios.patch(`${API_URL}/${url}`, payload, options)
        )
    }

    public async put(url: string, payload?: any) {
        return this.handleFetch(
            async () => await axios.put(`${API_URL}/${url}`, payload, options)
        )
    }
}
