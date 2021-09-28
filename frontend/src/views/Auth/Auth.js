import { useState } from 'react'

import { AuthPageDiv, ActionSwitch, SwitchOption } from './Auth.styles'
import LoginForm from './components/LoginForm/LoginForm'
import SignUpForm from './components/SignUpForm/SignUpForm'

const AuthWindow = () => {
    const [action, setAction] = useState('login')

    return (
        <>
            <AuthPageDiv>
                <ActionSwitch>
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
