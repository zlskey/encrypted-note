import { useContext, useState } from 'react'
import styled from 'styled-components';

import { UserContext } from '@contexts/UserContext';
import { setError, setValid, isFormUnfilled } from '@helpers/InputErrorHandler'
import fetchApi from '@helpers/fetchApi'
import SlideAnimation from '@components/SlideAnimation';
import InputField from '@components/InputField';
import RadioField from '../../components/RadioField';

const Form = styled.form`
        position: relative;
        overflow: hidden;
        width: 100%;
        padding: 0 30px;

        p {
            margin-top: 5px;
        }
`

const Button = styled.button`
        background-color: #2196f3;
        color: #fafafa;
        margin-top: 15px;
        outline: none;
        border: none;
        padding: 10px 30px;
        font-size: 1em;
        border-radius: 5px;
`

export const LoginForm = ({ action }) => {
    const { setUser } = useContext(UserContext)
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [dontLogout, setDontLogout] = useState(false);

    const handleSubmit = async e => {
        e.preventDefault()

        if (isFormUnfilled({ login, password })) return
        const data = { login, password, dontLogout }
        const res = await fetchApi('/auth/login', data)
        if (res.ok) setUser(res.content)
        else setError('res', res.error)
    }

    return (
        <Form onSubmit={e => handleSubmit(e)}>
            <SlideAnimation start={{ x: -300 }} end={{ x: 0 }} isVisible={action === 'login'}>
                <InputField name='login' text='Login' content={login} setContent={setLogin} />
                <InputField name='password' text='Password' type='password' content={password} setContent={setPassword} />
                <RadioField name='expiring' text="Don't logout" isChecked={dontLogout} setIsChecked={setDontLogout} />

                <Button className='clickable'>Confirm</Button>
                <div className="error res hide"></div>
            </SlideAnimation>
        </Form>
    );
}

export const SignUpForm = ({ action }) => {
    const { setUser } = useContext(UserContext)
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');

    const handleSubmit = async e => {
        e.preventDefault()

        if (isFormUnfilled({ username, password, repeatPassword })) return

        if (password !== repeatPassword) {
            setError('password', 'Password and second password must be the same')
            setError('repeatPassword', 'Password and second password must be the same')
            return
        }
        else {
            setValid('password')
            setValid('repeatPassword')
        }

        const user = { username, password }
        const res = await fetchApi('/auth/signup', user)
        if (res.ok) setUser(res.content)
        else setError('res', res.error)
    }

    return (
        <Form onSubmit={e => handleSubmit(e)}>
            <SlideAnimation start={{ x: 300 }} end={{ x: 0 }} isVisible={action === 'signup'}>
                <InputField
                    name='username'
                    text='Username'
                    content={username}
                    setContent={setUsername}
                />
                <InputField
                    name='password'
                    text='Password'
                    type='password'
                    content={password}
                    setContent={setPassword}
                />
                <InputField
                    name='repeatPassword'
                    text='Repeat password'
                    type='password'
                    content={repeatPassword}
                    setContent={setRepeatPassword}
                />
                <Button className='clickable'>Confirm</Button>
                <div className="error res hide"></div>
            </SlideAnimation>
        </Form>
    );
}

export const TryForm = ({ action }) => {
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const { setUser } = useContext(UserContext)

    const handleSubmit = async e => {
        e.preventDefault()

        const res = await fetchApi('/auth/signup', { password })

        if (res.ok) setUser(res.content)
        else setError('res', res.error)
    }

    return (
        <Form onSubmit={e => handleSubmit(e)}>
            <SlideAnimation start={{ x: 300 }} end={{ x: 0 }} isVisible={action === 'try'}>

                <p>
                    Use app without entering any personal data.
                </p>

                <InputField
                    name='password'
                    text='Password'
                    type='password'
                    content={password}
                    setContent={setPassword}
                />
                <InputField
                    name='repeatPassword'
                    text='Repeat password'
                    type='password'
                    content={repeatPassword}
                    setContent={setRepeatPassword}
                />

                <Button className='clickable'>Confirm</Button>
                <div className="error res hide"></div>
            </SlideAnimation>
        </Form>
    )
}
