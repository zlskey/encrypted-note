import { useContext, useState } from 'react'
import { useDispatch } from 'react-redux'

import InputField from '@commons/InputField/InputField'
import Button from '@commons/Button/Button'
import SlideAnimation from '@commons/SlideAnimation/SlideAnimation'
import { setError, setValid } from '@helpers/InputErrorHandler'
import { AlertContext } from '@contexts/AlertContext'
import useApi from '@hooks/useApi'
import { UPDATE_USER } from '@redux/types'
import { Form } from './SignUpForm.styles'

const SignUp = ({ action }) => {
    const { setAlert } = useContext(AlertContext)
    const dispatch = useDispatch()

    const [username, setUsername] = useState('')
    const [mail, setMail] = useState('')
    const [password, setPassword] = useState('')
    const [repeatPassword, setRepeatPassword] = useState('')
    const [doFetch, status] = useApi('/auth/signup', 'POST')

    const handleSubmit = async e => {
        e.preventDefault()

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
        doFetch((content, ok) => {
            if (ok) {
                dispatch({ type: UPDATE_USER, data: content })
                setAlert('success', `Welcome ${content.username}`)
            } else setError('res', content)
        }, user)
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
                    required={true}
                />
                <InputField
                    name='repeatPassword'
                    text='Repeat password*'
                    type='password'
                    content={repeatPassword}
                    setContent={setRepeatPassword}
                    required={true}
                />
                <Button loading={status === 'fetching'} content='Confirm' />
            </SlideAnimation>
        </Form>
    )
}
export default SignUp
