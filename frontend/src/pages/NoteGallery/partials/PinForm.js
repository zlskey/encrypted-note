import { useState } from 'react'
import { css } from 'styled-components'

import InputField from '@components/InputField'
import Button from '@components/Button'
import Window from '@components/Window'
import fetchApi from '@helpers/fetchApi'
import { isFormUnfilled, setError } from '@helpers/InputErrorHandler'

const PinForm = ({ setNotes, setSharedNotes, setShowPinForm, showPinForm }) => {
	const [pin, setPin] = useState('')

	const getNotes = async e => {
		e.preventDefault()

		if (isFormUnfilled({ pin })) return

		const res = await fetchApi('/user/notes', { pin })
		if (res.ok) {
			setNotes(res.content.userNotes)
			setSharedNotes(res.content.sharedNotes)
			setShowPinForm(false)
		} else setError('pin', res.error)
	}

	return (
		<Window
			setShowWindow={setShowPinForm}
			showWindow={showPinForm}
			customStyles={customStyles}
		>
			<h2>Enter your PIN</h2>
			<form onSubmit={e => getNotes(e)}>
				<InputField
					name="pin"
					type="password"
					content={pin}
					setContent={setPin}
					autoFocus={true}
				/>

				<Button content="Decrypt data" />
			</form>
		</Window>
	)
}

const customStyles = css`
	padding: 20px 40px;
	text-align: center;
	width: MIN(95vw, 400px);
`

export default PinForm
