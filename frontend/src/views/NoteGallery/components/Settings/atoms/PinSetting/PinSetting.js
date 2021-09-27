import { useContext, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { AlertContext } from '@contexts/AlertContext'
import InputField from '@components/InputField/InputField'
import { isFormUnfilled } from '@helpers/InputErrorHandler'
import useApi from '@hooks/useApi'
import { UPDATE_USER } from '@redux/types'

const PinSetting = ({ setShowPinSetting }) => {
    const [currentPin, setCurrentPin] = useState('')
    const [newPin, setNewPin] = useState('')
    const { setAlert } = useContext(AlertContext)
    const dispatch = useDispatch()
    const user = useSelector(state => state.auth.user)

    const [doChangePinFetch] = useApi('/settings/change-pin', 'PATCH')
    const [doSetPinFetch] = useApi('/settings/start-encryption', 'PATCH')

    const changePin = e => {
        e.preventDefault()
        const body = { currentPin, newPin }

        if (isFormUnfilled(body)) return

        setAlert('loading')
        doChangePinFetch((content, ok) => {
            if (ok) {
                setAlert('success', 'Pin changed')
                setShowPinSetting(false)
            } else setAlert('error', content)
        }, body)
    }

    const setPin = e => {
        e.preventDefault()

        if (isFormUnfilled({ newPin })) return

        setAlert('loading')
        doSetPinFetch(
            (content, ok) => {
                if (ok) {
                    dispatch({ type: UPDATE_USER, data: { user: content } })
                    setAlert('success', "Now you're safe")
                    setShowPinSetting(false)
                } else setAlert('error', content)
            },
            { pin: newPin }
        )
    }

    return (
        <>
            {user.encryption ? (
                <form onSubmit={changePin}>
                    <InputField
                        name='currentPin'
                        type='password'
                        text='Current pin'
                        content={currentPin}
                        setContent={setCurrentPin}
                    />
                    <InputField
                        name='newPin'
                        type='password'
                        text='New pin'
                        content={newPin}
                        setContent={setNewPin}
                    />
                    <input type='submit' className='hide' />
                </form>
            ) : (
                <form onSubmit={setPin}>
                    <InputField
                        name='newPin'
                        type='password'
                        text='New pin'
                        content={newPin}
                        setContent={setNewPin}
                    />
                </form>
            )}
        </>
    )
}

export default PinSetting
