import styled from 'styled-components'

export const Background = styled.div`
	width: 100vw;
	height: 100vh;
	position: absolute;
	left: 0;
	top: 0;
	z-index: 9;
	background-color: transparent;
`

export const Content = styled.div`
	z-index: 10;
	border-radius: 10px;
	margin-inline: auto;
	background-color: ${({ theme }) => theme.uiColor};
	box-shadow: ${({ theme }) => theme.type === 'light' && theme.shadow};
	color: ${({ theme }) => theme.fontColor};
	transition: 0.1s;
	overflow: hidden;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translateX(-50%) translateY(-50%);
	width: MIN(95vw, 800px);
	transition: 0.1s;
	${props => props.customStyles}
`
