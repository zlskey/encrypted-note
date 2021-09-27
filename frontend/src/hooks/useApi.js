import { useState } from 'react'

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000'

const useApi = (route, method = 'GET') => {
    const [status, setStatus] = useState(null)

    const doFetch = async (onSuccess, data) => {
        const body = data ? JSON.stringify(data) : null

        const options = {
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            cors: 'no-cors',
            method,
            body,
        }

        setStatus('fetching')
        try {
            const res = await fetch(API_URL + route, options)

            const content = await res.json()
            const ok = res.ok

            setStatus('finished')
            onSuccess(content, ok)
        } catch (err) {
            setStatus('error')
        }
    }

    return [doFetch, status]
}

export default useApi
