import { useContext, useEffect, useState } from 'react'

import { ThemeContext } from '@contexts/ThemeContext'
import Window from '@components/Window/Window'
import TopPanel from './atoms/TopPanel/TopPanel'
import { NoteContent, TextArea, noteCustomStyles } from './FocusedNote.styles'

const FocusedNote = ({ note, setNoteToFocus, setNotes, setSharedNotes }) => {
	const [content, setContent] = useState(note.content || '')
	const { theme } = useContext(ThemeContext)

	const [isSaved, setIsSaved] = useState(null)
	const [isEditing, setIsEditing] = useState(false)

	useEffect(() => {
		const handleKeyUp = e => {
			if (e.code === 'Escape') setNoteToFocus(null)
		}

		document.addEventListener('keyup', handleKeyUp)
		return () => document.removeEventListener('keyup', handleKeyUp)
	}, [isEditing, setNoteToFocus])

	return (
		<Window
			showWindow={note}
			setShowWindow={setNoteToFocus}
			onClickClosing={isSaved !== false}
			customStyles={noteCustomStyles}
		>
			<TopPanel
				note={note}
				isSaved={isSaved}
				setNoteToFocus={setNoteToFocus}
				content={content}
				setNotes={setNotes}
				setIsSaved={setIsSaved}
				setSharedNotes={setSharedNotes}
				isEditing={isEditing}
				setIsEditing={setIsEditing}
			/>

			{note === 'new' || isEditing ? (
				<TextArea
					autoComplete="off"
					autoFocus="on"
					value={content}
					theme={theme}
					onChange={e => {
						setContent(e.target.value)
						setIsSaved(false)
					}}
				/>
			) : (
				<NoteContent>{note.content}</NoteContent>
			)}
		</Window>
	)
}

export default FocusedNote
