import { createContext, useContext, useEffect, useState } from 'react'

import Loader from '@components/SiteLoader/SiteLoader'
import fetchApi from '@helpers/fetchApi'
import { ThemeContext } from './ThemeContext'
import { AlertContext } from './AlertContext'

export const UserContext = createContext(null)

const UserContextProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    const { setIsDarkTheme } = useContext(ThemeContext)
    const { setAlert } = useContext(AlertContext)

    useEffect(() => {
        ;(async () => {
            const res = await fetchApi('/auth/verify')
            if (res.ok) {
                setUser(res.content)
                setIsLoading(false)
            } else setAlert('error', res.error)
        })()
    }, [setAlert])

    useEffect(
        () => user && setIsDarkTheme(user.theme === 'light' ? false : true),
        [user, setIsDarkTheme],
    )

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {isLoading ? <Loader /> : <>{children}</>}
        </UserContext.Provider>
    )
}

export default UserContextProvider
