import styled from "styled-components"
import { useContext, useEffect, useState } from "react"

import { getSize } from "@helpers/responsiveFacilities"
import { ThemeContext } from "@contexts/ThemeContext"
import CloseOnOuterClick from "@components/CloseOnOuterClick.js"
import TopPanel from "./TopPanel"

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
    box-shadow: ${({ theme }) => theme.type === 'light' && theme.shadow};
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

        color: ${({ theme }) => theme.fontColor};
    }
`

const FocusedNote = ({ note, setNoteToFocus, setNotes, setSharedNotes }) => {
    const [content, setContent] = useState(note.content || "")
    const { theme } = useContext(ThemeContext)

    const [isSaved, setIsSaved] = useState(null)
    const [isEditing, setIsEditing] = useState(false)

    useEffect(() => {
        const handleKeyUp = e => {
            const key = e.code
            if (key === 'Escape') setNoteToFocus(null)
        }

        document.addEventListener('keyup', handleKeyUp)
        return () => document.removeEventListener('keyup', handleKeyUp)
    }, [isEditing, setNoteToFocus])

    return (
        <FocusedNoteWrapper>
            <CloseOnOuterClick valueToSet={isEditing || note} setSomething={setNoteToFocus} >
                <FocusedNoteWindow theme={theme}>
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

                    {note === "new" || isEditing ? (
                        <textarea
                            autoComplete="off"
                            autoFocus="on"
                            value={content}
                            onChange={(e) => {
                                setContent(e.target.value)
                                setIsSaved(false)
                            }}
                        />
                    ) : (
                        <div className="content">{note.content}</div>
                    )}
                </FocusedNoteWindow>
            </CloseOnOuterClick>
        </FocusedNoteWrapper>
    )
}

export default FocusedNote
