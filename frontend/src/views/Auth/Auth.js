import { useContext, useState } from 'react'

import { AuthPageDiv, ActionSwitch, SwitchOption } from './Auth.styles'
import LoginForm from './components/LoginForm/LoginForm'
import SignUpForm from './components/SignUpForm/SignUpForm'

import { ThemeContext } from '@contexts/ThemeContext'

const AuthWindow = () => {
    const { theme } = useContext(ThemeContext)
    const [action, setAction] = useState('login')

    // useEffect(() => {
    //     if (!user) return

    //     doFetch((content, ok) => {
    //         if (ok) {
    //             dispatch({ type: UPDATE_USER, data: { user: null } })
    //             setAlert('success', 'Come back soon 😊')
    //         }
    //     })
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [setAlert, dispatch, doFetch])

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
