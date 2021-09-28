import {
    IconEdit,
    IconTrash,
    IconArrowLeft,
    IconDeviceFloppy,
    IconUnlink,
    IconShare,
} from '@tabler/icons'
import { useContext, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { AlertContext } from '@contexts/AlertContext'

import useApi from '@hooks/useApi'
import {
    CHANGE_USER_NOTE,
    REMOVE_USER_NOTE,
    REMOVE_SHARED_NOTE,
    ADD_USER_NOTE,
} from '@redux/types'
import { HIDE_FOCUSED_NOTE } from '@redux/types'

import { TopPanelDiv, UpperRow, Buttons } from './TopPanel.styles'
import ShareWindow from '../Sharing/Sharing'

const TopPanel = ({
    isSaved,
    setIsSaved,
    isEditing,
    setIsEditing,
    content,
}) => {
    const user = useSelector(state => state.user)
    const note = useSelector(state => state.focusedNote.data)
    const dispatch = useDispatch()

    const { setAlert } = useContext(AlertContext)

    const [showShareWindow, setShowShareWindow] = useState(false)
    const isShared = note.author && note.author !== user.username

    const [doRemoveNoteFetch] = useApi('/note', 'DELETE')
    const [doSaveNoteFetch] = useApi('/note', 'POST')
    const [doSaveChangesFetch] = useApi('/note', 'PATCH')
    const [doUnlinkNoteFetch] = useApi('/note/unlink', 'PATCH')

    const date = note.updatedAt
        ? new Date(note.updatedAt).toLocaleDateString()
        : new Date().toLocaleDateString()

    const removeNote = async () => {
        const body = { id: note._id }

        doRemoveNoteFetch((content, ok) => {
            if (ok) {
                dispatch({ type: REMOVE_USER_NOTE, note })
                dispatch({ type: HIDE_FOCUSED_NOTE })
            } else setAlert('error', content)
        }, body)
    }

    const saveNote = async () => {
        const body = { content }

        doSaveNoteFetch((content, ok) => {
            if (ok) {
                dispatch({ type: ADD_USER_NOTE, note: content })
                setIsSaved(true)
            } else setAlert('error', content)
        }, body)
    }

    const saveChanges = async () => {
        const body = { content, id: note._id }
        doSaveChangesFetch((res, ok) => {
            if (ok) {
                dispatch({ type: CHANGE_USER_NOTE, note: { ...note, content } })
                setIsSaved(true)
            } else setAlert('error', res)
        }, body)
    }

    const unlinkNote = async () => {
        const body = { id: note._id, content: note.content }

        doUnlinkNoteFetch((content, ok) => {
            if (ok) {
                dispatch({ type: REMOVE_SHARED_NOTE, note })
                dispatch({ type: HIDE_FOCUSED_NOTE })
            } else setAlert('error', content)
        }, body)
    }

    const handleSaveButtonClick = () => {
        if (!content || isSaved) return
        else if (note === 'new') saveNote()
        else if (isEditing) saveChanges()
        else return
    }

    return (
        <TopPanelDiv>
            <UpperRow>
                <Buttons>
                    <Icon
                        title='Close'
                        Icon={IconArrowLeft}
                        handleClick={() =>
                            dispatch({ type: HIDE_FOCUSED_NOTE })
                        }
                    />

                    {note !== 'new' && !isShared && !isEditing && (
                        <>
                            <Icon
                                title='Edit note'
                                Icon={IconEdit}
                                handleClick={() => setIsEditing(true)}
                            />
                            <Icon
                                title='Remove note'
                                Icon={IconTrash}
                                handleClick={() => removeNote()}
                            />
                            <Icon
                                title='Share note'
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
                                title='Unlink note'
                                Icon={IconUnlink}
                                handleClick={() => unlinkNote()}
                            />
                            <p title='author'>{note.author}</p>
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

                <div className='date'>{date}</div>
            </UpperRow>

            {showShareWindow && note.author === user.username && !isEditing && (
                <ShareWindow />
            )}
        </TopPanelDiv>
    )
}

const Icon = ({ handleClick, Icon, title, ...props }) => (
    <div title={title}>
        <Icon
            onClick={handleClick}
            size='30px'
            stroke='1'
            className='clickable'
            {...props}
        />
    </div>
)

export default TopPanel
