import fetchApi from '@helpers/fetchApi'
import { useContext, useState } from 'react'
import { UserContext } from '@contexts/UserContext'
import { AlertContext } from '@contexts/AlertContext'
import InputField from '@components/InputField/InputField'
import { isFormUnfilled } from '@helpers/InputErrorHandler'

const PasswordSetting = ({ setShowPasswordSetting }) => {
	const [currentPassword, setCurrentPassword] = useState('')
	const [newPassword, setNewPassword] = useState('')

	const { setAlert } = useContext(AlertContext)
	const { setUser } = useContext(UserContext)

	const passwordHandler = e => {
		e.preventDefault()

		if (isFormUnfilled({ currentPassword, newPassword })) return

		fetchApi(
			'/settings/change-password',
			{ currentPassword, newPassword },
			'PATCH'
		).then(res => {
			if (res.ok) {
				setAlert('success', 'Password changed')
				setUser(res.content)
				setShowPasswordSetting(false)
			} else setAlert('error', res.error)
		})
	}

	return (
		<form onSubmit={passwordHandler}>
			<InputField
				name="currentPassword"
				type="password"
				text="current password"
				content={currentPassword}
				setContent={setCurrentPassword}
			/>
			<InputField
				name="newPassword"
				type="password"
				text="new password"
				content={newPassword}
				setContent={setNewPassword}
			/>
			<input type="submit" className="hide" />
		</form>
	)
}

export default PasswordSetting
