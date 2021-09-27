import { useContext, useRef, useEffect } from 'react'
import { ThemeContext } from '@contexts/ThemeContext'

import { Background, Content } from './Window.styles'

const Window = ({
    children,
    showWindow,
    setShowWindow,
    onClickClosing = false,
    customStyles = {},
}) => {
    const { theme } = useContext(ThemeContext)
    const content = useRef(null)

    const closeWindow = e => {
        if (!onClickClosing || (e && content.current.contains(e.target))) return
        setShowWindow(null)
    }

    useEffect(() => {
        const handleKeyUp = e => {
            if (e.code === 'Escape') closeWindow()
        }

        document.addEventListener('keyup', handleKeyUp)
        return () => {
            document.removeEventListener('keyup', handleKeyUp)
        }
    }, [])

    return (
        <>
            {showWindow && (
                <Background onClick={closeWindow}>
                    <Content
                        ref={content}
                        theme={theme}
                        customStyles={customStyles}
                    >
                        {children}
                    </Content>
                </Background>
            )}
        </>
    )
}

export default Window
