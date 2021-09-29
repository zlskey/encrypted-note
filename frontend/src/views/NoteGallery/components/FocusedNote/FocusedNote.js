import { useState } from 'react'

import Window from '@commons/Window/Window'
import TopPanel from './atoms/TopPanel/TopPanel'
import { NoteContent, TextArea, noteCustomStyles } from './FocusedNote.styles'
import { useSelector, useDispatch } from 'react-redux'
import { HIDE_FOCUSED_NOTE } from '@redux/types'

const FocusedNote = () => {
    const data = useSelector(state => state.focusedNote.data)
    const dispatch = useDispatch()

    const [content, setContent] = useState(data.content)

    const [isSaved, setIsSaved] = useState(null)
    const [isEditing, setIsEditing] = useState(false)

    const hideFocusedNote = () => dispatch({ type: HIDE_FOCUSED_NOTE })

    return (
        <Window
            showWindow={data}
            setShowWindow={hideFocusedNote}
            onClickClosing={isSaved !== false}
            customStyles={noteCustomStyles}
        >
            <TopPanel
                isSaved={isSaved}
                setIsSaved={setIsSaved}
                isEditing={isEditing}
                setIsEditing={setIsEditing}
                content={content}
            />

            {data === 'new' || isEditing ? (
                <TextArea
                    autoComplete='off'
                    autoFocus='on'
                    value={content}
                    onChange={e => {
                        setContent(e.target.value)
                        setIsSaved(false)
                    }}
                />
            ) : (
                <NoteContent>{data.content}</NoteContent>
            )}
        </Window>
    )
}

export default FocusedNote
