import { useContext, useEffect, useState } from 'react'
import { IconPlus } from '@tabler/icons'

import { NoteGalleryDiv, Notes, SectionHeader } from './NoteGallery.styles'

import { ThemeContext } from '@contexts/ThemeContext'
import { UserContext } from '@contexts/UserContext'
import fetchApi from '@helpers/fetchApi'
import { AlertContext } from '@contexts/AlertContext'

import Note from './components/Note/Note'
import FocusedNote from './components/FocusedNote/FocusedNote'
import Settings from './components/Settings/Settings'
import PinForm from './components/PinForm/PinForm'

const NoteGallery = () => {
	const { theme } = useContext(ThemeContext)
	const { user } = useContext(UserContext)
	const { setAlert } = useContext(AlertContext)
	const [noteToFocus, setNoteToFocus] = useState(null)

	const range = new Array(8).fill('loading')
	const [notes, setNotes] = useState(range)
	const [sharedNotes, setSharedNotes] = useState([])

	const [showPinForm, setShowPinForm] = useState(user.encryption)
	const [blurContent, setBlurContent] = useState(false)

	useEffect(() => {
		if (showPinForm || noteToFocus) setBlurContent(true)
		else setBlurContent(false)
	}, [showPinForm, noteToFocus])

	useEffect(() => {
		if (user.encryption) return

		fetchApi('/user/notes', {}).then(res => {
			if (res.ok) setNotes(res.content.userNotes)
			else setAlert('error', res.error)
		})
	}, [user, setAlert])

	return (
		<>
			<PinForm
				setNotes={setNotes}
				showPinForm={showPinForm}
				setShowPinForm={setShowPinForm}
				setSharedNotes={setSharedNotes}
			/>

			{noteToFocus && (
				<FocusedNote
					setNoteToFocus={setNoteToFocus}
					note={noteToFocus}
					setNotes={setNotes}
					setSharedNotes={setSharedNotes}
				/>
			)}

			<NoteGalleryDiv
				theme={theme}
				style={{
					filter: `${blurContent ? 'blur(5px)' : ''}`,
				}}
			>
				<SectionHeader theme={theme}>
					<p>Your notes</p>

					<IconPlus
						size="30px"
						onClick={() => setNoteToFocus('new')}
						className="clickable"
					/>
				</SectionHeader>

				<Notes>
					{notes.length === 0 && <p>Add your first note!</p>}

					{notes.length !== 0 &&
						notes.map(note => (
							<Note
								setNoteToFocus={setNoteToFocus}
								key={note._id || Math.random()}
								data={note}
							/>
						))}
				</Notes>

				{sharedNotes.length !== 0 && (
					<>
						<SectionHeader theme={theme}>
							<p>Shared notes</p>
						</SectionHeader>
						<Notes>
							{sharedNotes.map(note => (
								<Note
									setNoteToFocus={setNoteToFocus}
									key={note._id || Math.random()}
									data={note}
								/>
							))}
						</Notes>
					</>
				)}
			</NoteGalleryDiv>

			<Settings
				setBlurContent={setBlurContent}
				blurContent={blurContent}
			/>
		</>
	)
}

export default NoteGallery
