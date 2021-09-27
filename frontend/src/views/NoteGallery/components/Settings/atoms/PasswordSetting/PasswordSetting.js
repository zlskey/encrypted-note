import useApi from '@hooks/useApi'
import { useContext, useState } from 'react'

import { AlertContext } from '@contexts/AlertContext'
import InputField from '@components/InputField/InputField'
import { isFormUnfilled } from '@helpers/InputErrorHandler'

const PasswordSetting = ({ setShowPasswordSetting }) => {
    const [currentPassword, setCurrentPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')

    const { setAlert } = useContext(AlertContext)

    const [doFetch] = useApi('/settings/change-password', 'PATCH')

    const passwordHandler = e => {
        const body = { currentPassword, newPassword }
        e.preventDefault()

        if (isFormUnfilled(body)) return

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
