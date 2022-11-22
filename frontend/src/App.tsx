import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { CssBaseline, createTheme } from '@mui/material'
import React, { useCallback, useEffect, useState } from 'react'

import AlertContextProvider from './contexts/AlertContext'
import ChangePassphrase from './Pages/ChangePassphrase'
import ChangePassword from './Pages/ChangePassword'
import ChangeUsername from './Pages/ChangeUsername'
import Login from './Pages/Login'
import Note from './Pages/Note'
import Notes from './Pages/Notes'
import PassphraseContextProvider from './contexts/PassphraseContext'
import Settings from './Pages/Settings'
import SignUp from './Pages/SignUp'
import SiteLoader from './Pages/Loader'
import { ThemeProvider } from '@emotion/react'
import { selectUser } from 'src/reducers/user.reducer'
import useApi from 'src/hooks/useApi'
import { useSelector } from 'react-redux'

const App = () => {
    const api = useApi()
    const user = useSelector(selectUser)
    const [isLoading, setIsLoading] = useState(true)

    const authorizeUser = useCallback(async () => {
        if (user['_id']) {
            setIsLoading(false)
            return
        }

        await api.user.authorize()

        setIsLoading(false)

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user])

    const getTheme = () => {
        return createTheme({
            palette: {
                mode: user.lightMode ? 'light' : 'dark',
            },
        })
    }

    useEffect(() => {
        authorizeUser()
    }, [authorizeUser])

    if (isLoading)
        return (
            <ThemeProvider theme={getTheme}>
                <SiteLoader /> <CssBaseline />
            </ThemeProvider>
        )

    return (
        <ThemeProvider theme={getTheme}>
            <AlertContextProvider>
                <PassphraseContextProvider>
                    <BrowserRouter>
                        <CssBaseline />

                        {Boolean(user['_id']) ? (
                            <Routes>
                                <Route path='/' element={<Notes />} />
                                <Route path='/note' element={<Note />} />
                                <Route path='/settings'>
                                    <Route
                                        path='username'
                                        element={<ChangeUsername />}
                                    />
                                    <Route
                                        path='password'
                                        element={<ChangePassword />}
                                    />
                                    <Route
                                        path='passphrase'
                                        element={<ChangePassphrase />}
                                    />
                                    <Route path='' element={<Settings />} />
                                </Route>
                                <Route path='*' element={<Navigate to='/' />} />
                            </Routes>
                        ) : (
                            <Routes>
                                <Route path='/signup' element={<SignUp />} />
                                <Route path='/login' element={<Login />} />
                                <Route
                                    path='*'
                                    element={<Navigate to='/login' />}
                                />
                            </Routes>
                        )}
                    </BrowserRouter>
                </PassphraseContextProvider>
            </AlertContextProvider>
        </ThemeProvider>
    )
}

export default App
