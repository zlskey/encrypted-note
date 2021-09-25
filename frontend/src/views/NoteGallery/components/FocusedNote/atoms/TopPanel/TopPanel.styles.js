import styled from 'styled-components'

export const TopPanelDiv = styled.div`
	padding: 10px;
	display: flex;
	flex-direction: column;
	box-shadow: ${({ theme }) => theme.shadow};
	gap: 10px;
`

export const UpperRow = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
`

export const Buttons = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	font-size: 20px;
	gap: 10px;
`
