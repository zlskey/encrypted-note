import { useContext, useState } from 'react'
import InputField from '@components/InputField/InputField'
import Button from '@components/Button/Button'
import { setError, setValid } from '@helpers/InputErrorHandler'
import useApi from '@hooks/useApi'
import { useHistory } from 'react-router'
import { AlertContext } from '@contexts/AlertContext'

const PasswordForm = ({ id }) => {
    const [password, setPassword] = useState('')
    const [secondPassword, setSecondPassword] = useState('')
    const history = useHistory()

    const { setAlert } = useContext(AlertContext)

    const [doFetch, status] = useApi('/auth/password-recover', 'POST')

    const handlePasswordChange = e => {
        e.preventDefault()

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

        const body = { password, id }

        doFetch((content, ok) => {
            if (ok) {
                history.push('/auth')
                setAlert('success', 'Password is changed')
            } else setError('res', content)
        }, body)
    }

    return (
        <form onSubmit={handlePasswordChange}>
            <InputField
                name='password'
                text='Enter new password'
                type='password'
                content={password}
                setContent={setPassword}
                required={true}
            />
            <InputField
                name='secondPassword'
                text='Repeat new password'
                type='password'
                content={secondPassword}
                setContent={setSecondPassword}
                required={true}
            />

            <Button loading={status === 'fetching'} content='Change password' />
        </form>
    )
}

export default PasswordForm
