import { useContext, useState, useEffect } from 'react'
import { useHistory, Link } from 'react-router-dom'

import fetchApi from '@helpers/fetchApi'
import { UserContext } from '@contexts/UserContext'
import InputField from '@components/InputField/InputField'
import RadioField from '@components/RadioField/RadioField'
import Button from '@components/Button/Button'
import SlideAnimation from '@components/SlideAnimation/SlideAnimation'
import { setError, isFormUnfilled } from '@helpers/InputErrorHandler'
import { ThemeContext } from '@contexts/ThemeContext'
import { AlertContext } from '@contexts/AlertContext'
import { Form, LoginBar, Separator } from './LoginForm.styles'

const Login = ({ action }) => {
	const { setUser, user } = useContext(UserContext)
	const { setAlert } = useContext(AlertContext)
	const { theme } = useContext(ThemeContext)
	const history = useHistory()

	const [login, setLogin] = useState('')
	const [password, setPassword] = useState('')
	const [dontLogout, setDontLogout] = useState(false)

	useEffect(() => user && history.push('/'), [user, history])

	const handleSubmit = async e => {
		e.preventDefault()

		if (isFormUnfilled({ login, password })) return

		const data = { login, password, dontLogout }
		const res = await fetchApi('/auth/login', data)
		if (res.ok) {
			setUser(res.content)
			setAlert('success', `Hi ${res.content.username} 👋`)
		} else setError('res', res.error)
	}

	return (
		<Form onSubmit={handleSubmit}>
			<SlideAnimation
				start={{ x: -300 }}
				end={{ x: 0 }}
				isVisible={action === 'login'}
			>
				<div className="error res hide"></div>

				<InputField
					name="login"
					text="Login"
					content={login}
					setContent={setLogin}
				/>
				<InputField
					name="password"
					text="Password"
					type="password"
					content={password}
					setContent={setPassword}
				/>

				<LoginBar>
					<RadioField
						name="expiring"
						text="Don't logout"
						isChecked={dontLogout}
						setIsChecked={setDontLogout}
					/>

					{window.innerWidth > 500 && <Separator theme={theme} />}

					<Link
						style={{
							textDecoration: 'none',
							color: theme.fontColor,
							fontWeight: 300,
							fontSize: '19px',
						}}
						to="/password-recovery"
					>
						Reset password
					</Link>
				</LoginBar>

				<Button content="Confirm" />
			</SlideAnimation>
		</Form>
	)
}

export default Login
