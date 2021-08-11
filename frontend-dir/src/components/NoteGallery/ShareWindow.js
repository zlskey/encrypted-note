import styled from "styled-components";
import { useContext, useState } from "react";
import fetchApi from "../../scripts/fetchApi";
import { ThemeContext } from "../../contexts/ThemeContext";
import { IconUnlink } from '@tabler/icons';
import { setError } from '../../scripts/InputErrorHandler'

const ShareWindowDiv = styled.div`
    display: flex;
    flex-direction: row; 
    align-items: center;    
    gap: 5px;
`

const User = styled.p`
    background-color: ${({ theme }) => theme.fontColor};
    color: ${({ theme }) => theme.bgColor};
    padding: 3px 10px;
    border-radius: 100px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 5px;
    cursor: pointer;
    font-size: 15px;
`

const Input = styled.input`
    background-color: transparent;
    border: none;
    outline: none;
    font-size: 16px;
    transition: 0.3s;

    /* &:focus {
        border-bottom: 1px solid ${({ theme }) => theme.fontColor};
    } */
`

const ShareWindow = ({ note, setNotes }) => {
    const { theme } = useContext(ThemeContext)
    const [newShare, setNewShare] = useState('');

    const { _id: id, content } = note

    const shareNote = async e => {
        e.preventDefault()

        const res = await fetchApi('/share-note', { id, content, recipient: newShare }, 'PATCH')

        if (res.ok) {
            note.recipients = res.content
            setNotes(notes => {
                return notes.map(el => {
                    if (el._id === id) return note
                    else return el
                })
            })
        }
        else setError('res', res.error)
    }

    const unlinkNote = async recipientToUnlink => {
        const res = await fetchApi('/unlink-note', { recipientToUnlink, id, content }, 'PATCH')

        if (res.ok) {
            note.recipients = res.content
            setNotes(notes => {
                return notes.map(note => {
                    if (note._id === id) return note
                    else return note
                })
            })
        }
        else setError('res', res.error)
    }

    return (
        <ShareWindowDiv theme={theme}>
            <p>Users with access: </p>
            {note.recipients.map(user => (
                <User
                    key={user}
                    className='clickable'
                    title={`unlink ${user}`}
                    theme={theme}
                    onClick={e => unlinkNote(user)}
                >
                    {user} <IconUnlink size="15" />
                </User>
            ))}
            <form onSubmit={e => shareNote(e)}>
                <Input value={newShare} onChange={e => setNewShare(e.target.value)} theme={theme} type="text" placeholder='share to...' />
                <div className="error res"></div>
            </form>
        </ShareWindowDiv>
    );
}

export default ShareWindow;