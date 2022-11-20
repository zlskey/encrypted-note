import {
    Alert,
    AlertColor,
    Grid,
    Slide,
    useMediaQuery,
    useTheme,
} from '@mui/material'
import React, { createContext, useCallback, useEffect, useState } from 'react'

interface IAlert {
    message: string
    type: AlertColor
    id: number
}

export type setAlert = (message: string, type?: AlertColor) => void
type removeAlert = (id: number) => void

export const AlertContext = createContext<setAlert>(() => {})

const AlertContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [alerts, setAlerts] = useState<IAlert[]>([])

    const theme = useTheme()
    const matches = useMediaQuery(theme.breakpoints.up('sm'))

    const setAlert: setAlert = (message, type = 'error') => {
        setAlerts((prev: IAlert[]) => {
            for (const alert of alerts) {
                if (alert.message === message) return prev
            }

            if (prev.length >= 3) prev.shift()

            return [...prev, { message, type, id: Math.random() }]
        })
    }

    const removeAlert: removeAlert = id => {
        setAlerts(prev => prev.filter(alert => alert.id !== id))
    }

    return (
        <AlertContext.Provider value={setAlert}>
            <>
                <Grid
                    container
                    sx={{
                        position: 'fixed',
                        right: 1,
                        bottom: 1,
                        p: 1,
                        zIndex: 2137,
                        width: matches ? '40vw' : '100%',
                    }}
                    rowSpacing={1}
                >
                    {alerts.map(alert => (
                        <AlertComponent
                            key={alert.id}
                            removeAlert={removeAlert}
                            {...alert}
                        />
                    ))}
                </Grid>

                {children}
            </>
        </AlertContext.Provider>
    )
}

const AlertComponent = ({
    message,
    type,
    removeAlert,
    id,
}: {
    message: string
    type: AlertColor
    removeAlert: removeAlert
    id: number
}) => {
    const [isVisible, setIsVisible] = useState(true)
    const handleClose = useCallback(() => {
        removeAlert(id)
        setIsVisible(false)
    }, [id, removeAlert])

    useEffect(
        function () {
            const timeout = setTimeout(handleClose, 2000)

            return () => clearTimeout(timeout)
        },
        [handleClose]
    )

    return (
        <Grid item xs={12}>
            <Slide direction='up' in={isVisible} mountOnEnter unmountOnExit>
                <Alert
                    variant='filled'
                    onClose={() => handleClose()}
                    severity={type}
                >
                    {message}
                </Alert>
            </Slide>
        </Grid>
    )
}

export default AlertContextProvider
