import {
	IconEdit,
	IconTrash,
	IconArrowLeft,
	IconDeviceFloppy,
	IconUnlink,
	IconShare,
} from '@tabler/icons'
import styled from 'styled-components'

import fetchApi from '@helpers/fetchApi'
import ShareWindow from './Sharing'
import { useContext, useState } from 'react'
import { UserContext } from '@contexts/UserContext'
import { AlertContext } from '@contexts/AlertContext'
import { ThemeContext } from '@contexts/ThemeContext'

const TopPanel = ({
	note,
	content,
	setSharedNotes,
	setNoteToFocus,
	setNotes,
	isSaved,
	setIsSaved,
	isEditing,
	setIsEditing,
}) => {
	const [showShareWindow, setShowShareWindow] = useState(false)
	const { user } = useContext(UserContext)
	const { setAlert } = useContext(AlertContext)
	const { theme } = useContext(ThemeContext)
	const [isShared] = useState(note.author !== user.username)

	const date = note.updatedAt
		? new Date(note.updatedAt).toLocaleDateString()
		: new Date().toLocaleDateString()

	const removeNote = async () => {
		const res = await fetchApi('/note', { id: note._id }, 'DELETE')

		if (res.ok) {
			setNotes(notes => notes.filter(el => el._id !== note._id))
			setNoteToFocus(null)
		} else setAlert('error', res.error)
	}

	const saveNote = async () => {
		const res = await fetchApi('/note', { content }, 'POST')

		if (res.ok) {
			setNotes(notes => (notes ? [...notes, res.content] : [res.content]))
			setIsSaved(true)
		} else setAlert('error', res.error)
	}

	const saveChanges = async () => {
		const res = await fetchApi('/note', { content, id: note._id }, 'PATCH')

		if (res.ok) {
			setIsSaved(true)
			setNotes(notes =>
				notes.map(el => {
					if (el._id === note._id) el.content = content
					return el
				})
			)
		} else setAlert('error', res.error)
	}

	const unlinkNote = async () => {
		const res = await fetchApi(
			'note/unlink',
			{ id: note._id, content: note.content },
			'PATCH'
		)

		if (res.ok) {
			setSharedNotes(notes => notes.filter(el => el._id !== note._id))
			setNoteToFocus(null)
		} else setAlert('error', res.error)
	}

	const handleSaveButtonClick = () => {
		if (!content || isSaved) return
		else if (note === 'new') saveNote()
		else if (isEditing) saveChanges()
		else return
	}

	return (
		<TopPanelDiv theme={theme}>
			<div className="upper-row">
				<div className="buttons">
					<Icon
						title="Close"
						Icon={IconArrowLeft}
						handleClick={() => setNoteToFocus(null)}
					/>

					{note !== 'new' && !isShared && !isEditing && (
						<>
							<Icon
								title="Edit note"
								Icon={IconEdit}
								handleClick={() => setIsEditing(true)}
							/>
							<Icon
								title="Remove note"
								Icon={IconTrash}
								handleClick={() => removeNote()}
							/>
							<Icon
								title="Share note"
								Icon={IconShare}
								handleClick={() =>
									setShowShareWindow(!showShareWindow)
								}
							/>
						</>
					)}

					{isShared && note !== 'new' && (
						<>
							<Icon
								title="Unlink note"
								Icon={IconUnlink}
								handleClick={() => unlinkNote()}
							/>
							<p title="author">{note.author}</p>
						</>
					)}

					{isSaved !== null && (
						<Icon
							Icon={IconDeviceFloppy}
							handleClick={() => handleSaveButtonClick()}
							color={isSaved ? '#4caf50' : '#f44336'}
						/>
					)}
				</div>

				<div className="date">{date}</div>
			</div>

			{showShareWindow && note.author === user.username && (
				<ShareWindow note={note} setNotes={setNotes} />
			)}
		</TopPanelDiv>
	)
}

const TopPanelDiv = styled.div`
	padding: 10px;
	display: flex;
	flex-direction: column;
	box-shadow: ${({ theme }) => theme.shadow};
	gap: 10px;

	.upper-row {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}

	.buttons {
		display: flex;
		flex-direction: row;
		align-items: center;
		font-size: 20px;
		gap: 10px;
	}
`

const Icon = ({ handleClick, Icon, title, ...props }) => (
	<div title={title}>
		<Icon
			onClick={handleClick}
			size="30px"
			stroke="1"
			className="clickable"
			{...props}
		/>
	</div>
)

export default TopPanel
