import fetchApi from '@helpers/fetchApi'
import { useContext, useState } from 'react';
import { UserContext } from '@contexts/UserContext';
import { AlertContext } from '@contexts/AlertContext';
import InputField from '@components/InputField'
import { isFormUnfilled } from '@helpers/InputErrorHandler'

const PinSetting = ({ setShowPinSetting }) => {
    const [currentPin, setCurrentPin] = useState('');
    const [newPin, setNewPin] = useState('');
    const { setType, setContent } = useContext(AlertContext)
    const { user } = useContext(UserContext)

    const changePin = e => {
        e.preventDefault()

        if (isFormUnfilled({ currentPin, newPin })) return

        fetchApi('/settings/change-pin', { currentPin, newPin }, 'PATCH')
            .then(
                res => {
                    if (res.ok) {
                        setType('success')
                        setContent('Pin changed')
                        setShowPinSetting(false)
                    }
                    else {
                        setType('error')
                        setContent(res.error)
                    }
                }
            )
    }

    const setPin = e => {
        e.preventDefault()

        if (isFormUnfilled({ newPin })) return

        fetchApi('/settings/start-encryption', { pin: newPin }, 'PATCH')
            .then(
                res => {
                    if (res.ok) {
                        setType('success')
                        setContent('Now you\'re safe')
                        setShowPinSetting(false)
                    }
                    else {
                        setType('error')
                        setContent(res.error)
                    }
                }
            )
    }

    return (
        <>
            {user.encryption
                ? <form onSubmit={changePin}>
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
                    <input type="submit" className="hide" />
                </form>
                : <form onSubmit={setPin}>
                    <InputField
                        name='newPin'
                        type='password'
                        text='New pin'
                        content={newPin}
                        setContent={setNewPin}
                    />
                </form>
            }

        </>
    );
}

export default PinSetting;