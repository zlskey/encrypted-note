import styled from 'styled-components'
import { getColumns } from '@helpers/responsiveFacilities'

export const NoteGalleryDiv = styled.div`
	padding: 0 10px;
	transition: 0.2s;
	color: ${({ theme }) => theme.fontColor};
`

export const Notes = styled.div`
	display: grid;
	grid-template-columns: ${getColumns()};
	gap: 20px;
	padding-top: 15px;

	p {
		font-size: 20px;
	}
`
export const SectionHeader = styled.div`
	width: 100%;
	margin-top: 20px;
	text-align: left;
	border-bottom: 2px solid ${({ theme }) => theme.fontColor};
	opacity: 0.7;
	display: flex;
	flex-direction: row;
	justify-content: space-between;

	p {
		font-weight: 500;
		font-size: 25px;
	}
`
