import { useState } from 'react'
import { useDispatch } from 'react-redux'

import { NoteDiv, NoteDate, Content } from './Note.styles'
import { SHOW_FOCUSED_NOTE } from '@redux/types'

const Note = ({ data }) => {
    const [isLoading] = useState(data === 'loading')
    const dispatch = useDispatch()

    const date = new Date(data.updatedAt).toLocaleDateString()

    return (
        <NoteDiv
            className={!isLoading && 'clickable'}
            onClick={() =>
                !isLoading && dispatch({ type: SHOW_FOCUSED_NOTE, note: data })
            }
        >
            <NoteDate isLoading={isLoading}>{date}</NoteDate>
            <Content isLoading={isLoading}>{data.content}</Content>
        </NoteDiv>
    )
}

export default Note
