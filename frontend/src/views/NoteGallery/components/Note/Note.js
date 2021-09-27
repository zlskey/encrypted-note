import { useContext, useState } from 'react'
import { ThemeContext } from '@contexts/ThemeContext'
import { NoteDiv, NoteDate, Content } from './Note.styles'
import { SHOW_FOCUSED_NOTE } from '@redux/types'
import { useDispatch } from 'react-redux'

const Note = ({ data }) => {
    const { theme } = useContext(ThemeContext)
    const [isLoading] = useState(data === 'loading')
    const dispatch = useDispatch()

    const date = new Date(data.updatedAt).toLocaleDateString()

    return (
        <NoteDiv
            theme={theme}
            className={!isLoading && 'clickable'}
            onClick={() =>
                !isLoading && dispatch({ type: SHOW_FOCUSED_NOTE, note: data })
            }
        >
            <NoteDate theme={theme} isLoading={isLoading}>
                {date}
            </NoteDate>
            <Content theme={theme} isLoading={isLoading}>
                {data.content}
            </Content>
        </NoteDiv>
    )
}

export default Note
