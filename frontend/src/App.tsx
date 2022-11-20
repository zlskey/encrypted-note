import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { CssBaseline, createTheme } from '@mui/material'
import React, { useCallback, useEffect, useState } from 'react'

import AlertContextProvider from './contexts/AlertContext'
import Login from './Pages/Login'
import Note from './Pages/Note'
import Notes from './Pages/Notes'
import PassphraseContextProvider from './contexts/PassphraseContext'
import SignUp from './Pages/SignUp'
import SiteLoader from './Pages/Loader'
import { ThemeProvider } from '@emotion/react'
import { selectUser } from 'src/reducers/user.reducer'
import useApi from 'src/hooks/useApi'
import { useSelector } from 'react-redux'

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
})

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

    useEffect(() => {
        authorizeUser()
    }, [authorizeUser])

    if (isLoading)
        return (
            <ThemeProvider theme={darkTheme}>
                <SiteLoader /> <CssBaseline />
            </ThemeProvider>
        )

    return (
        <ThemeProvider theme={darkTheme}>
            <AlertContextProvider>
                <PassphraseContextProvider>
                    <BrowserRouter>
                        <CssBaseline />

                        <Routes>
                            {Boolean(user['_id']) ? (
                                <>
                                    <Route path='/' element={<Notes />} />
                                    <Route path='/note' element={<Note />} />
                                    <Route
                                        path='*'
                                        element={<Navigate to='/' />}
                                    />
                                </>
                            ) : (
                                <>
                                    <Route
                                        path='/signup'
                                        element={<SignUp />}
                                    />
                                    <Route path='/login' element={<Login />} />
                                    <Route
                                        path='*'
                                        element={<Navigate to='/login' />}
                                    />
                                </>
                            )}
                        </Routes>
                    </BrowserRouter>
                </PassphraseContextProvider>
            </AlertContextProvider>
        </ThemeProvider>
    )
}

export default App
