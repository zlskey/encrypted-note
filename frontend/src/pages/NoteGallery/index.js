import { useContext, useEffect, useState } from "react"
import styled from "styled-components"
import { IconPlus } from "@tabler/icons"

import { ThemeContext } from "@contexts/ThemeContext"
import { UserContext } from "@contexts/UserContext"
import fetchApi from "@helpers/fetchApi"
import Note from "./Note"
import FocusedNote from "./FocusedNote"
import Settings from "./Settings/"
import PinForm from "./PinForm"
import { getColumns } from "@helpers/responsiveFacilities"
import { AlertContext } from '@contexts/AlertContext'

const NoteGalleryDiv = styled.div`
	padding: 0 10px;
	transition: 0.2s;
	color: ${({ theme }) => theme.fontColor};
`

const Notes = styled.div`
	display: grid;
	grid-template-columns: ${getColumns()};
	gap: 20px;
	padding-top: 15px;

	p {
		font-size: 20px;
	}
`
const SectionHeader = styled.div`
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

const NoteGallery = () => {
	const { theme } = useContext(ThemeContext)
	const { user } = useContext(UserContext)
	const { setType, setContent } = useContext(AlertContext)
	const [noteToFocus, setNoteToFocus] = useState(null)

	const range = new Array(8).fill("loading")
	const [notes, setNotes] = useState(range)
	const [sharedNotes, setSharedNotes] = useState([])

	const [showPinForm, setShowPinForm] = useState(user.encryption)
	const [blurContent, setBlurContent] = useState(false);

	useEffect(() => {
		if (showPinForm || noteToFocus) setBlurContent(true)
		else setBlurContent(false)
	}, [showPinForm, noteToFocus])

	useEffect(() => {
		if (user.encryption) return
		fetchApi("/user/notes", {}).then((res) => {
			if (res.ok) setNotes(res.content.userNotes)
			else {
				setType('error')
				setContent(res.error)
			}
		})
	}, [user.encryption, setType, setContent])

	return (
		<>
			{showPinForm && (
				<PinForm
					setNotes={setNotes}
					setSharedNotes={setSharedNotes}
					setShowPinForm={setShowPinForm}
				/>
			)}

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
					filter: `${blurContent ? "blur(5px)" : ""}`,
				}}
			>
				<SectionHeader theme={theme}>
					<p>Your notes</p>

					<IconPlus
						size="30px"
						onClick={() => setNoteToFocus("new")}
						className="clickable"
					/>
				</SectionHeader>

				<Notes>
					{notes.length === 0 && <p>Add your first note!</p>}

					{notes.length !== 0 &&
						notes.map((note) => (
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
							{sharedNotes.map((note) => (
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

			<Settings setBlurContent={setBlurContent} />
		</>
	)
}

export default NoteGallery
