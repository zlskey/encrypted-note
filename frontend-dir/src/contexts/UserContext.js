import { createContext, useContext, useEffect, useState } from 'react'
import fetchApi from '../scripts/fetchApi';
import Loader from '../components/SiteLoader'
import { ThemeContext } from './ThemeContext';
import Alert from '../components/partials/Alert'

export const UserContext = createContext(null)


const UserContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const { setIsDarkTheme } = useContext(ThemeContext)
    const [alertContent, setAlertContent] = useState('');

    useEffect(() => {
        (async () => {
            const res = await fetchApi('/verify')
            if (res.ok) {
                setUser(res.content)
                setIsLoading(false)
            }
            else setAlertContent(res.error)
        })()
    }, [])

    useEffect(() => user && setIsDarkTheme(user.theme === 'light' ? false : true), [user])

    return (
        <UserContext.Provider value={{ user, setUser }}>
            <Alert content={alertContent} setContent={setAlertContent} />
            {
                isLoading
                    ? <Loader />
                    : <>{children}</>
            }
        </UserContext.Provider>
    );
}

export default UserContextProvider;