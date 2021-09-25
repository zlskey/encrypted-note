import { useContext, useEffect, useState } from 'react'

import { AuthPageDiv, ActionSwitch, SwitchOption } from './Auth.styles'
import LoginForm from './components/LoginForm/LoginForm'
import SignUpForm from './components/SignUpForm/SignUpForm'

import { ThemeContext } from '@contexts/ThemeContext'
import { UserContext } from '@contexts/UserContext'
import { AlertContext } from '@contexts/AlertContext'

import fetchApi from '@helpers/fetchApi'

const AuthWindow = () => {
	const { theme } = useContext(ThemeContext)
	const { user, setUser } = useContext(UserContext)
	const { setAlert } = useContext(AlertContext)
	const [action, setAction] = useState('login')

	useEffect(() => {
		if (user) {
			fetchApi('/user/logout').then(res => {
				if (res.ok) {
					setUser(null)
					setAlert('success', 'Come back soon 😊')
				} else setAlert('error', res.error)
			})
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [setUser, setAlert])

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
