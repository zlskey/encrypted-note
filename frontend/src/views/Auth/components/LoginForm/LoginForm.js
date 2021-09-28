import { useContext, useState, useEffect } from 'react'
import { useHistory, Link } from 'react-router-dom'

import InputField from '@components/InputField/InputField'
import RadioField from '@components/RadioField/RadioField'
import Button from '@components/Button/Button'
import SlideAnimation from '@components/SlideAnimation/SlideAnimation'
import { setError, setValid } from '@helpers/InputErrorHandler'

import { AlertContext } from '@contexts/AlertContext'
import { Form, LoginBar, Separator } from './LoginForm.styles'
import { useSelector, useDispatch } from 'react-redux'
import useApi from '@hooks/useApi'
import { UPDATE_USER } from '@redux/types'

const Login = ({ action }) => {
    const { setAlert } = useContext(AlertContext)

    const history = useHistory()
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()

    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [dontLogout, setDontLogout] = useState(false)
    const [doFetch, status] = useApi('/auth/login', 'POST')

    useEffect(() => user?.username && history.push('/'), [user, history])

    const handleSubmit = async e => {
        e.preventDefault()
        setValid('res')

        const user = { username: login, password, dontLogout }

        doFetch((content, ok) => {
            if (ok) {
                dispatch({ type: UPDATE_USER, data: content })
                setAlert('success', `Hi ${content.username} 👋`)
            } else setError('res', content)
        }, user)
    }

    return (
        <Form onSubmit={handleSubmit}>
            <SlideAnimation
                start={{ x: -300 }}
                end={{ x: 0 }}
                isVisible={action === 'login'}
            >
                <div className='error res hide'></div>

                <InputField
                    name='login'
                    text='Login'
                    content={login}
                    setContent={setLogin}
                    required={true}
                />
                <InputField
                    name='password'
                    text='Password'
                    type='password'
                    content={password}
                    setContent={setPassword}
                    required={true}
                />

                <LoginBar>
                    <RadioField
                        name='expiring'
                        text="Don't logout"
                        isChecked={dontLogout}
                        setIsChecked={setDontLogout}
                    />

                    {window.innerWidth > 500 && <Separator />}

                    <Link to='/password-recovery'>Reset password</Link>
                </LoginBar>

                <Button loading={status === 'fetching'} content='Confirm' />
            </SlideAnimation>
        </Form>
    )
}

export default Login
