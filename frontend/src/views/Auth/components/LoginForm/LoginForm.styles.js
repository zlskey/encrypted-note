import styled from 'styled-components'

export const Form = styled.form`
	position: relative;
	overflow: hidden;
	width: 100%;
	padding: 0 30px;
`

export const LoginBar = styled.div`
	display: flex;
	align-items: flex-end;
	justify-content: space-around;
	gap: 10px;
	margin-block: 10px;

	@media (max-width: 500px) {
		flex-direction: column;
		align-items: center;
	}
`

export const Separator = styled.div`
	height: 20px;
	width: 1px;
	background-color: ${props => props.theme.fontColor};
`
