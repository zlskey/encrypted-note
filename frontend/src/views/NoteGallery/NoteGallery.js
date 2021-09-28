import { useContext, useEffect, useState } from 'react'
import { IconPlus } from '@tabler/icons'

import { NoteGalleryDiv, Notes, SectionHeader } from './NoteGallery.styles'

import { AlertContext } from '@contexts/AlertContext'

import Note from './components/Note/Note'
import FocusedNote from './components/FocusedNote/FocusedNote'
import Settings from './components/Settings/Settings'
import PinForm from './components/PinForm/PinForm'

import useApi from '@hooks/useApi'
import { UPDATE_USER_NOTES, UPDATE_SHARED_NOTES } from '@redux/types'
import { SHOW_FOCUSED_NOTE } from '@redux/types'
import { useSelector, useDispatch } from 'react-redux'

const loadingRange = new Array(8).fill('loading')

const NoteGallery = () => {
    const user = useSelector(state => state.user)
    const userNotes = useSelector(state => state.notes.user)
    const sharedNotes = useSelector(state => state.notes.shared)
    const noteToFocus = useSelector(state => state.focusedNote.data)
    const dispatch = useDispatch()

    const { setAlert } = useContext(AlertContext)

    const [showPinForm, setShowPinForm] = useState(user.encryption)

    const [doFetch, status] = useApi('/user/notes', 'POST')
    useEffect(() => {
        if (user.encryption) return

        doFetch((content, ok) => {
            if (ok) {
                dispatch({ type: UPDATE_USER_NOTES, notes: content.userNotes })
                dispatch({
                    type: UPDATE_SHARED_NOTES,
                    notes: content.sharedNotes,
                })
            } else setAlert('error', content)
        })

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            <PinForm
                showPinForm={showPinForm}
                setShowPinForm={setShowPinForm}
            />

            {noteToFocus && <FocusedNote />}

            <NoteGalleryDiv>
                <SectionHeader>
                    <p>Your notes</p>

                    <IconPlus
                        size='30px'
                        onClick={() =>
                            dispatch({ type: SHOW_FOCUSED_NOTE, note: 'new' })
                        }
                        className='clickable'
                    />
                </SectionHeader>

                <Notes>
                    {status === 'fetching' &&
                        loadingRange.map(note => (
                            <Note data={note} key={Math.random()} />
                        ))}

                    {status !== 'fetching' && userNotes.length === 0 && (
                        <p>Add your first note!</p>
                    )}

                    {userNotes.length !== 0 &&
                        userNotes.map(note => (
                            <Note key={note._id} data={note} />
                        ))}
                </Notes>

                {sharedNotes.length !== 0 && (
                    <>
                        <SectionHeader>
                            <p>Shared notes</p>
                        </SectionHeader>
                        <Notes>
                            {sharedNotes.map(note => (
                                <Note
                                    key={note._id || Math.random()}
                                    data={note}
                                />
                            ))}
                        </Notes>
                    </>
                )}
            </NoteGalleryDiv>

            <Settings />
        </>
    )
}

export default NoteGallery
