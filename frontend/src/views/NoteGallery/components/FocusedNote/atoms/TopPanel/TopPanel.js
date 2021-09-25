import {
	IconEdit,
	IconTrash,
	IconArrowLeft,
	IconDeviceFloppy,
	IconUnlink,
	IconShare,
} from '@tabler/icons'
import { useContext, useState } from 'react'

import { UserContext } from '@contexts/UserContext'
import { AlertContext } from '@contexts/AlertContext'
import { ThemeContext } from '@contexts/ThemeContext'
import fetchApi from '@helpers/fetchApi'

import { TopPanelDiv, UpperRow, Buttons } from './TopPanel.styles'
import ShareWindow from '../Sharing/Sharing'

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
	const isShared = note.author && note.author !== user.username

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
			'/note/unlink',
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
			<UpperRow>
				<Buttons>
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

					{isShared && (
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
				</Buttons>

				<div className="date">{date}</div>
			</UpperRow>

			{showShareWindow && note.author === user.username && (
				<ShareWindow note={note} setNotes={setNotes} />
			)}
		</TopPanelDiv>
	)
}

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
