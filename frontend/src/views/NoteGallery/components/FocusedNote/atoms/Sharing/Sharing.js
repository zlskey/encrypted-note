import { useContext, useState } from 'react'
import { IconUnlink } from '@tabler/icons'

import fetchApi from '@helpers/fetchApi'
import { ThemeContext } from '@contexts/ThemeContext'
import { AlertContext } from '@contexts/AlertContext'
import { setError, setValid } from '@helpers/InputErrorHandler'

import { SharingDiv, User, Input } from './Sharing.styles'

const Sharing = ({ note, setNotes }) => {
    const { theme } = useContext(ThemeContext)
    const { setAlert } = useContext(AlertContext)
    const [newRecipient, setNewRecipient] = useState('')
    const [recipients, setRecipients] = useState(note.recipients)

    const { _id: id, content } = note

    const shareNote = async e => {
        e.preventDefault()

        const res = await fetchApi(
            '/note/share',
            { id, content, recipient: newRecipient },
            'PATCH'
        )

        if (res.ok) {
            setRecipients(res.content)
            setNotes(notes => {
                return notes.map(el => {
                    if (el._id === id) return note
                    else return el
                })
            })
            setValid('res')
        } else setAlert('error', res.error)
        setNewRecipient('')
    }

    const unlinkNote = async recipientToUnlink => {
        const res = await fetchApi(
            '/note/unlink',
            { recipientToUnlink, id, content },
            'PATCH'
        )

        if (res.ok) {
            setRecipients(res.content)
            setNotes(notes => {
                return notes.map(note => {
                    if (note._id === id) return note
                    else return note
                })
            })
            setValid('res')
        } else setError('res', res.error)
    }

    return (
        <SharingDiv theme={theme}>
            <p>Users with access: </p>

            {recipients.map(user => (
                <User
                    key={user}
                    className='clickable'
                    title={`unlink ${user}`}
                    theme={theme}
                    onClick={e => unlinkNote(user)}
                >
                    {user} <IconUnlink size='15' />
                </User>
            ))}

            <form onSubmit={e => shareNote(e)}>
                <Input
                    value={newRecipient}
                    onChange={e => setNewRecipient(e.target.value)}
                    theme={theme}
                    type='text'
                    placeholder='share to...'
                />
                <div className='error res hide'></div>
            </form>
        </SharingDiv>
    )
}

export default Sharing
