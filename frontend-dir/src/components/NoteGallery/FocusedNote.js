import styled from 'styled-components';
import { useContext, useState } from 'react'
import { IconEdit, IconTrash, IconArrowLeft, IconDeviceFloppy, IconUnlink, IconShare } from '@tabler/icons';

import fetchApi from '../../scripts/fetchApi';
import CloseOnOuterClick from '../partials/CloseOnOuterClick.js';
import { ThemeContext } from '../../contexts/ThemeContext';
import { UserContext } from '../../contexts/UserContext'
import { getSize } from '../../scripts/responsiveFacilities';
import Alert from '../partials/Alert';
import ShareWindow from './ShareWindow';


const FocusedNoteWrapper = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: grid;
    place-items: center;
    z-index: 10;
    font-size: ${getSize()};
`

const FocusedNoteWindow = styled.div`
    width: 55vw;
    height: 60vh;
    z-index: 10;
    border-radius: 10px;
    margin-inline: auto;
    background-color: ${({ theme }) => theme.uiColor};
    box-shadow: ${({ theme }) => theme.shadow};
    color: ${({ theme }) => theme.fontColor};
    transition: 0.1s;
    overflow: hidden;

    @media screen and (max-width: 1000px) {
        width: 95vw;
    }

    .top-panel {
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
    }

    .content {
        height: calc(100% - 50px); 
        padding-inline: 15px;
        font-weight: 300;
        padding-block: ${getSize()};
        font-size: ${getSize()};
        white-space: pre;
        overflow-y: scroll;
        overflow-x: hidden;
    }

    textarea {
        background-color: transparent;
        width: calc(100% - 20px);
        margin-inline: 10px;
        border-radius: 10px;
        height: calc(100% - 60px);
        outline: none;
        padding: 10px;
        font-weight: 300;
        font-size: ${getSize()};
        border: none;

        color: ${({ theme }) => theme.fontColor}
}
`

const FocusedNote = ({ note, setNoteToFocus, setNotes, setSharedNotes }) => {
    const { theme } = useContext(ThemeContext)
    const { user } = useContext(UserContext)
    const [content, setContent] = useState(note.content || '');
    const [alertContent, setAlertContent] = useState('');

    const [isSaved, setIsSaved] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [isShared] = useState(note.author !== user.username);
    const [showShareWindow, setShowShareWindow] = useState(false);

    const date =
        note.updatedAt
            ? new Date(note.updatedAt).toLocaleDateString()
            : new Date().toLocaleDateString()

    const removeNote = async () => {
        const res = await fetchApi('/note', { id: note._id }, 'DELETE')

        if (res.ok) {
            setNotes(notes => notes.filter(el => el._id !== note._id))
            setNoteToFocus(null)
        }
        else setAlertContent(res.error)
    }


    const saveNote = async () => {
        const res = await fetchApi('/note', { content }, 'POST')

        if (res.ok) {
            setNotes(notes => notes ? [...notes, res.content] : [res.content])
            setIsSaved(true)
        }
        else setAlertContent(res.error)
    }

    const saveChanges = async () => {
        const res = await fetchApi('/note', { content, id: note._id }, 'PATCH')

        if (res.ok) {
            setIsSaved(true)
            setNotes(notes => notes.map(el => {
                if (el._id === note._id) el.content = content
                return el
            }))
        }
        else setAlertContent(res.error)
    }

    const unlinkNote = async () => {
        const res = await fetchApi('/unlink-note', { id: note._id, content: note.content }, 'PATCH')

        if (res.ok) {
            setSharedNotes(notes => notes.filter(el => el._id !== note._id))
            setNoteToFocus(null)
        }
        else setAlertContent(res.error)
    }

    const handleSaveButtonClick = () => {
        if (!content || isSaved) return
        else if (note === 'new') saveNote()
        else if (isEditing) saveChanges()
        else return
    }

    return (
        <FocusedNoteWrapper>
            <Alert content={alertContent} setContent={setAlertContent} />

            <CloseOnOuterClick setSomething={setNoteToFocus}>
                <FocusedNoteWindow theme={theme}>

                    <div className="top-panel">
                        <div className="upper-row">
                            <div className='buttons'>
                                <Icon title='Close' Icon={IconArrowLeft} handleClick={() => setNoteToFocus(null)} />

                                {note !== 'new' && !isShared &&
                                    <>
                                        <Icon title='Edit note' Icon={IconEdit} handleClick={() => setIsEditing(true)} />
                                        <Icon title='Remove note' Icon={IconTrash} handleClick={() => removeNote()} />
                                        <Icon title='Share note' Icon={IconShare} handleClick={() => setShowShareWindow(!showShareWindow)} />
                                    </>
                                }


                                {isShared && note !== 'new' &&
                                    <>
                                        <Icon title='Unlink note' Icon={IconUnlink} handleClick={() => unlinkNote()} />
                                        <p title='author'>{note.author}</p>
                                    </>
                                }

                                {isSaved !== null &&
                                    <Icon
                                        Icon={IconDeviceFloppy}
                                        handleClick={() => handleSaveButtonClick()}
                                        color={isSaved ? '#4caf50' : '#f44336'}
                                    />
                                }
                            </div>

                            <div className="date">{date}</div>
                        </div>
                        {showShareWindow && note.author === user.username && <ShareWindow note={note} setNotes={setNotes} />}
                    </div>

                    {note === 'new' || isEditing
                        ? <textarea
                            autoComplete='off'
                            autoFocus='on'
                            value={content}
                            onChange={e => {
                                setContent(e.target.value)
                                setIsSaved(false)
                            }} />
                        : <div className="content">{note.content}</div>
                    }

                </FocusedNoteWindow>
            </CloseOnOuterClick>
        </FocusedNoteWrapper>
    );
}

const Icon = ({ handleClick, Icon, title, ...props }) => <div title={title}><Icon onClick={handleClick} size='30px' stroke='1' className='clickable' {...props} /></div>

export default FocusedNote