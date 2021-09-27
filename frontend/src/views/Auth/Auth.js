import { useContext, useState } from 'react'

import { AuthPageDiv, ActionSwitch, SwitchOption } from './Auth.styles'
import LoginForm from './components/LoginForm/LoginForm'
import SignUpForm from './components/SignUpForm/SignUpForm'

import { ThemeContext } from '@contexts/ThemeContext'

const AuthWindow = () => {
    const { theme } = useContext(ThemeContext)
    const [action, setAction] = useState('login')

    return (
        <>
            <AuthPageDiv theme={theme}>
                <ActionSwitch theme={theme}>
                    <SwitchOption
                        onClick={() => setAction('login')}
                        className={`clickable ${
                            action === 'login' ? 'active' : ''
                        }`}
                    >
                        Login
                    </SwitchOption>
                    <SwitchOption
                        onClick={() => setAction('signup')}
                        className={`clickable ${
                            action === 'signup' ? 'active' : ''
                        }`}
                    >
                        Sign Up
                    </SwitchOption>
                </ActionSwitch>

                <LoginForm action={action} />
                <SignUpForm action={action} />
            </AuthPageDiv>
        </>
    )
}

export default AuthWindow
