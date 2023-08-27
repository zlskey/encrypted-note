import React, { createContext, useEffect, useState } from 'react'

import PassphraseDialog from 'src/components/Dialogs/PassphraseDialog'
import { selectUser } from 'src/reducers/user.reducer'
import { useSelector } from 'react-redux'

export interface ContextValue {
    isEncrypted: boolean
    passphrase: string
    handleSetPassphrase(value: string): void
}

const initialState = {
    isEncrypted: false,
    passphrase: '',
    handleSetPassphrase: () => {},
}

export const PassphraseContext = createContext<ContextValue>(initialState)

interface Props {
    children: React.ReactNode
}
const PassphraseContextProvider = ({ children }: Props) => {
    const user = useSelector(selectUser)

    const [isEncrypted, setIsEncrypted] = useState(true)
    const [passphrase, setPassphrase] = useState('')

    const handleSetPassphrase = async (value: string) => {
        setPassphrase(value)
    }

    useEffect(() => {
        setIsEncrypted(Boolean(user.encryption && !passphrase))
    }, [user.encryption, passphrase])

    return (
        <PassphraseContext.Provider
            value={{
                isEncrypted,
                passphrase,
                handleSetPassphrase,
            }}
        >
            {children}

            <PassphraseDialog showDialog={isEncrypted} />
        </PassphraseContext.Provider>
    )
}

export default PassphraseContextProvider
