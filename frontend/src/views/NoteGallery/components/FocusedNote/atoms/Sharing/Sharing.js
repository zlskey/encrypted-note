import { useContext, useState } from 'react'
import { IconUnlink } from '@tabler/icons'

import { AlertContext } from '@contexts/AlertContext'
import { setError, setValid } from '@helpers/InputErrorHandler'

import { SharingDiv, User, Input } from './Sharing.styles'
import useApi from '@hooks/useApi'

import { CHANGE_USER_NOTE, UPDATE_FOCUSED_NOTE } from '@redux/types'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'

const Sharing = () => {
    const note = useSelector(state => state.focusedNote.data)
    const dispatch = useDispatch()

    const { setAlert } = useContext(AlertContext)

    const [doShareFetch] = useApi('/note/share', 'PATCH')
    const [doUnlinkFetch] = useApi('/note/unlink', 'PATCH')

    const [newRecipient, setNewRecipient] = useState('')

    const shareNote = async e => {
        e.preventDefault()

        const body = {
            id: note._id,
            content: note.content,
            recipient: newRecipient,
        }

        setAlert('loading')
        doShareFetch((content, ok) => {
            if (ok) {
                dispatch({
                    type: CHANGE_USER_NOTE,
                    note: { ...note, recipients: content },
                })
                dispatch({
                    type: UPDATE_FOCUSED_NOTE,
                    data: { recipients: content },
                })
                setValid('res')
                setAlert('hide')
            } else setAlert('error', content)

            setNewRecipient('')
        }, body)
    }

    const unlinkNote = async recipientToUnlink => {
        const body = { recipientToUnlink, id: note._id, content: note.content }

        setAlert('loading')
        doUnlinkFetch((content, ok) => {
            if (ok) {
                dispatch({
                    type: CHANGE_USER_NOTE,
                    note: { ...note, recipients: content },
                })
                dispatch({
                    type: UPDATE_FOCUSED_NOTE,
                    data: { recipients: content },
                })
                setValid('res')
                setAlert('hide')
            } else setError('res', content)
        }, body)
    }

    return (
        <SharingDiv>
            <p>Users with access: </p>

            {note.recipients.map(user => (
                <User
                    key={user}
                    className='clickable'
                    title={`unlink ${user}`}
                    onClick={e => unlinkNote(user)}
                >
                    {user} <IconUnlink size='15' />
                </User>
            ))}

            <form onSubmit={e => shareNote(e)}>
                <Input
                    value={newRecipient}
                    onChange={e => setNewRecipient(e.target.value)}
                    type='text'
                    placeholder='share to...'
                />
                <div className='error res hide'></div>
            </form>
        </SharingDiv>
    )
}

export default Sharing
