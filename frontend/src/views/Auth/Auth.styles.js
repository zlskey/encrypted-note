import styled from 'styled-components'

export const AuthPageDiv = styled.div`
	transform: translateX(-50%) translateY(-50%);
	padding: 20px 10px;
	font-size: 18px;
	border-radius: 10px;
	transition: 0.3s;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	text-align: center;
	position: absolute;
	top: 50%;
	left: 50%;
	width: MIN(400px, 95vw);

	color: ${({ theme }) => theme.fontColor};
	background-color: ${({ theme }) => theme.uiColor};
	box-shadow: ${({ theme }) => theme.shadow};
`

export const ActionSwitch = styled.div`
	width: 70%;
	height: 40px;
	border-radius: 1000px;
	display: flex;
	flex-direction: row;
	align-items: stretch;
	justify-content: space-around;
	box-shadow: ${({ theme }) => theme.shadow};
	margin-top: 10px;
	overflow: hidden;
`

export const SwitchOption = styled.p`
	flex-grow: 1;
	display: grid;
	place-items: center;
	transition: 0.3s;

	&.active {
		color: #fafafa;
		background-color: #2196f3;
	}
`
