import { useState } from 'react'
import InputField from '@components/InputField/InputField'
import Button from '@components/Button/Button'
import { isFormUnfilled, setError, setValid } from '@helpers/InputErrorHandler'
import fetchApi from '@helpers/fetchApi'
import { useHistory } from 'react-router'

const PasswordForm = ({ id }) => {
    const [password, setPassword] = useState('')
    const [secondPassword, setSecondPassword] = useState('')
    const history = useHistory()

    const handlePasswordChange = e => {
        e.preventDefault()

        if (isFormUnfilled({ password, secondPassword })) return

        if (password !== secondPassword) {
            setError(
                'password',
                'Password and second password must be the same'
            )
            setError(
                'secondPassword',
                'Password and second password must be the same'
            )
            return
        } else {
            setValid('password')
            setValid('secondPassword')
        }

        fetchApi('/auth/password-recover', {
            password,
            id,
        }).then(res => {
            if (res.ok) history.push('/auth')
            else setError('res', res.error)
        })
    }

    return (
        <form onSubmit={handlePasswordChange}>
            <InputField
                name='password'
                text='Enter new password'
                type='password'
                content={password}
                setContent={setPassword}
            />
            <InputField
                name='secondPassword'
                text='Repeat new password'
                type='password'
                content={secondPassword}
                setContent={setSecondPassword}
            />

            <Button content='Change password' />
        </form>
    )
}

export default PasswordForm
