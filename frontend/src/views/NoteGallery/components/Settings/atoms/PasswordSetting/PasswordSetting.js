import useApi from '@hooks/useApi'
import { useContext, useState } from 'react'

import { AlertContext } from '@contexts/AlertContext'
import InputField from '@commons/InputField/InputField'
import {} from '@helpers/InputErrorHandler'

const PasswordSetting = ({ setShowPasswordSetting }) => {
    const [currentPassword, setCurrentPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')

    const { setAlert } = useContext(AlertContext)

    const [doFetch] = useApi('/settings/change-password', 'PATCH')

    const passwordHandler = e => {
        e.preventDefault()
        const body = { currentPassword, newPassword }

        setAlert('loading')
        doFetch((content, ok) => {
            if (ok) {
                setAlert('success', 'Password changed')
                setShowPasswordSetting(false)
            } else setAlert('error', content)
        }, body)
    }

    return (
        <form onSubmit={passwordHandler}>
            <InputField
                name='currentPassword'
                type='password'
                text='current password'
                content={currentPassword}
                setContent={setCurrentPassword}
            />
            <InputField
                name='newPassword'
                type='password'
                text='new password'
                content={newPassword}
                setContent={setNewPassword}
            />
            <input type='submit' className='hide' />
        </form>
    )
}

export default PasswordSetting
