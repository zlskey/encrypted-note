import { useContext, useEffect, useState } from 'react'
import { ThemeContext } from '@contexts/ThemeContext'
import { NoteDiv, NoteDate, Content } from './Note.styles'

const Note = ({ setNoteToFocus, data }) => {
    const { theme } = useContext(ThemeContext)
    const { updatedAt, content } = data
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        if (data !== 'loading') setIsLoading(false)
    }, [data])

    const date = new Date(updatedAt).toLocaleDateString()

    return (
        <NoteDiv
            theme={theme}
            className={isLoading ? '' : 'clickable'}
            onClick={() => !isLoading && setNoteToFocus(data)}
        >
            <NoteDate theme={theme} isLoading={isLoading}>
                {date}
            </NoteDate>
            <Content theme={theme} isLoading={isLoading}>
                {content}
            </Content>
        </NoteDiv>
    )
}

export default Note
