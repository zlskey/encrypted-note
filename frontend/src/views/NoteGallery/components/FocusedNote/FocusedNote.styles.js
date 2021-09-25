import styled from 'styled-components'

export const NoteContent = styled.p`
	padding-inline: 15px;
	font-weight: 300;
	white-space: pre;
	overflow-y: scroll;
	overflow-x: hidden;
	height: 45vh;
	font-size: 1.1rem;
	padding-block: 0.8rem;
`

export const TextArea = styled.textarea`
	height: 45vh;
	width: 100%;
	background-color: transparent;
	margin-inline: 10px;
	border-radius: 10px;
	outline: none;
	padding: 10px;
	font-weight: 300;
	border: none;
	font-size: 1.1rem;
	padding-block: 0.8rem;

	color: ${({ theme }) => theme.fontColor};
`

export const noteCustomStyles = {
	width: 'min(800px, 95vw)',
}
