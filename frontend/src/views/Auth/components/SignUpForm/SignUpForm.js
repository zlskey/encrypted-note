import { useContext, useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

import { UserContext } from '@contexts/UserContext'
import InputField from '@components/InputField/InputField'
import Button from '@components/Button/Button'
import SlideAnimation from '@components/SlideAnimation/SlideAnimation'
import { setError, isFormUnfilled, setValid } from '@helpers/InputErrorHandler'
import fetchApi from '@helpers/fetchApi'
import { AlertContext } from '@contexts/AlertContext'
import { Form } from './SignUpForm.styles'

const SignUp = ({ action }) => {
    const { setUser, user } = useContext(UserContext)
    const { setAlert } = useContext(AlertContext)
    const history = useHistory()

    const [username, setUsername] = useState('')
    const [mail, setMail] = useState('')
    const [password, setPassword] = useState('')
    const [repeatPassword, setRepeatPassword] = useState('')

    useEffect(() => user && history.push('/'), [user, history])

    const handleSubmit = async e => {
        e.preventDefault()

        if (isFormUnfilled({ password, repeatPassword })) return

        if (password !== repeatPassword) {
            setError(
                'password',
                'Password and second password must be the same'
            )
            setError(
                'repeatPassword',
                'Password and second password must be the same'
            )
            return
        } else {
            setValid('password')
            setValid('repeatPassword')
        }

        const user = { username, password, mail }
        const res = await fetchApi('/auth/signup', user)
        if (res.ok) {
            setUser(res.content)
            setAlert('success', `Welcome ${res.content.username}`)
        } else setError('res', res.error)
    }

    return (
        <Form onSubmit={handleSubmit}>
            <SlideAnimation
                start={{ x: 300 }}
                end={{ x: 0 }}
                isVisible={action === 'signup'}
            >
                <div className='error res hide'></div>

                <InputField
                    name='username'
                    text='Username'
                    content={username}
                    setContent={setUsername}
                />
                <InputField
                    name='mail'
                    text='Mail'
                    content={mail}
                    setContent={setMail}
                />
                <InputField
                    name='password'
                    text='Password*'
                    type='password'
                    content={password}
                    setContent={setPassword}
                />
                <InputField
                    name='repeatPassword'
                    text='Repeat password*'
                    type='password'
                    content={repeatPassword}
                    setContent={setRepeatPassword}
                />
                <Button content='Confirm' />
            </SlideAnimation>
        </Form>
    )
}
export default SignUp
