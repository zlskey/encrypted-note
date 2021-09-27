import { useContext, useEffect } from 'react'
import NoteGallery from '@views/NoteGallery/NoteGallery'
import AuthPage from '@views/Auth/Auth'
import PasswordRecovery from '@views/PasswordRecovery/PasswordRecovery'
import ThemeContextProvider, { ThemeContext } from './contexts/ThemeContext'
import AlertContextProvider from './contexts/AlertContext'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from 'react-router-dom'

import SiteLoader from './components/SiteLoader/SiteLoader'
import { useSelector, useDispatch } from 'react-redux'
import useApi from '@hooks/useApi'
import { UPDATE_USER } from '@redux/types'

const App = () => {
    return (
        <ThemeContextProvider>
            <AlertContextProvider>
                <AppRouter />
            </AlertContextProvider>
        </ThemeContextProvider>
    )
}

const AppRouter = () => {
    const { theme } = useContext(ThemeContext)
    const user = useSelector(state => state.auth.user)

    const dispatch = useDispatch()

    const [doFetch, status] = useApi('/auth/verify')

    useEffect(() => {
        doFetch(content => {
            dispatch({
                type: UPDATE_USER,
                data: { user: content === false ? null : content },
            })
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            {(status === 'fetching' || status === 'error') && (
                <SiteLoader theme={theme} />
            )}

            {status === 'finished' && (
                <Router>
                    <Switch>
                        <Route path='/auth' component={AuthPage} />
                        <Route
                            path='/password-recovery'
                            component={PasswordRecovery}
                        />

                        {user ? (
                            <Route path='/' component={NoteGallery} />
                        ) : (
                            <Redirect to='/auth' />
                        )}
                    </Switch>
                </Router>
            )}
        </>
    )
}

export default App
