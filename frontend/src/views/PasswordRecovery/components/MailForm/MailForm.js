import { useState } from 'react'
import InputField from '@components/InputField/InputField'
import Button from '@components/Button/Button'
import { isFormUnfilled, setError } from '@helpers/InputErrorHandler'
import fetchApi from '@helpers/fetchApi'
import { Info } from './MailForm.styles'

const MailSending = () => {
	const [mail, setMail] = useState('')
	const [InfoMessage, setInfoMessage] = useState('')

	const handleMailSending = async e => {
		e.preventDefault()

		if (isFormUnfilled({ mail })) return

		const res = await fetchApi('/auth/send-recover-mail', { mail })

		if (res.ok) setInfoMessage('Mail is sent')
		else setError('res', res.error)
	}

	return (
		<form onSubmit={handleMailSending}>
			{InfoMessage ? (
				<Info>{InfoMessage}</Info>
			) : (
				<>
					<p style={{ fontSize: '17px' }}>
						If you want to recover your password and you have your
						mail connected with your account. Just tipe it right
						here and check your mailbox{' '}
					</p>
					<InputField
						name="mail"
						text="Your mail"
						content={mail}
						setContent={setMail}
					/>
					<Button content="Send mail with link" />
				</>
			)}
		</form>
	)
}

export default MailSending
