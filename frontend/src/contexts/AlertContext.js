import React, { createContext, useState, useEffect } from 'react'
import Alert from '@components/Alert/Alert'

export const AlertContext = createContext(null)

const AlertContextProvider = ({ children }) => {
    const [type, setType] = useState(null)
    const [content, setContent] = useState(null)
    const [color, setColor] = useState(null)
    const [showAlert, setShowAlert] = useState(false)

    useEffect(() => {
        switch (type) {
            case 'error':
                setColor('#f44336')
                break
            case 'info':
                setColor('#2196f3')
                break
            case 'success':
                setColor('#4caf50')
                break
            default:
                setColor(current => current)
        }
    }, [type])

    const setAlert = (type, content) => {
        setShowAlert(true)
        setContent(content)
        setType(type)
    }

    return (
        <AlertContext.Provider value={{ setAlert }}>
            <Alert
                type={type}
                content={content}
                color={color}
                showAlert={showAlert}
                setShowAlert={setShowAlert}
            />

            {children}
        </AlertContext.Provider>
    )
}

export default AlertContextProvider
