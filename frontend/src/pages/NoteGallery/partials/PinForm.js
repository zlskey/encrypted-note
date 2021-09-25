import { useContext, useState } from 'react'
import styled from 'styled-components'

import { ThemeContext } from '@contexts/ThemeContext'
import InputField from '@components/InputField'
import Button from '@components/Button'
import fetchApi from '@helpers/fetchApi'
import { isFormUnfilled, setError } from '@helpers/InputErrorHandler'

const PinForm = ({ setNotes, setSharedNotes, setShowPinForm }) => {
	const { theme } = useContext(ThemeContext)
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
		<Background>
			<PinFormDiv theme={theme}>
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
			</PinFormDiv>
		</Background>
	)
}

const Background = styled.div`
	width: 100vw;
	height: 100vh;
	position: absolute;
	left: 0;
	top: 0;
	background-color: transparent;
`

const PinFormDiv = styled.div`
	z-index: 10;
	border-radius: 10px;
	margin-inline: auto;
	background-color: ${({ theme }) => theme.uiColor};
	box-shadow: ${({ theme }) => theme.shadow};
	color: ${({ theme }) => theme.fontColor};
	transition: 0.1s;
	overflow: hidden;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translateX(-50%) translateY(-50%);
	padding: 20px 40px;
	text-align: center;
	width: MIN(95vw, 400px);

	h2 {
		font-weight: 300;
	}
`

export default PinForm
