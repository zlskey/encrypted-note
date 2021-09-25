import styled from 'styled-components'

export const InputFieldDiv = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	margin-top: 20px;
	text-align: left;
	position: relative;
`

export const Label = styled.label`
	margin-bottom: 5px;
	font-size: 1.2rem;
`

export const Input = styled.input`
	border-radius: 5px;
	border: none;
	outline: none;
	padding: 10px;
	font-size: 1em;
	font-weight: 300;
	font-family: 'Roboto', sans-serif;
	color: inherit;
	background-color: ${({ theme }) => theme.bgColor};
	box-shadow: ${({ theme }) => theme.type === 'light' && theme.shadow};
`

export const Error = styled.div`
	background-color: transparent;
	color: #f44336;
	padding: 0;
	margin: 5px 0;
`
