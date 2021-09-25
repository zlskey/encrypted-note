import styled from 'styled-components'

export const Value = styled.span`
	color: #03a9f4;
	cursor: pointer;

	&:hover {
		text-decoration: underline;
	}
`

export const Content = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.4rem;
	font-size: 18px;
	margin-block: 1rem;

	form {
		margin: 0 auto;
		margin-top: -15px;
		transform: scale(0.95);
		width: 80%;
	}
`
