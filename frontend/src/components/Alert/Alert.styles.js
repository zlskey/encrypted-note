import styled from 'styled-components'

export const Alert = styled.div`
	position: absolute;
	bottom: 2rem;
	left: 50%;
	transform: translateX(-50%);
	background-color: ${props => props.background};
	box-shadow: ${props => props.theme.type === 'light' && props.theme.shadow};
	color: #fafafa;
	font-size: 1.3rem;
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	gap: 0.4rem;
	padding: 0.7rem 3rem;
	border-radius: 5px;
	z-index: 10;
`
