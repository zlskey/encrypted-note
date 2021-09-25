import { useContext, useRef } from 'react'
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
        if (!onClickClosing || content.current.contains(e.target)) return
        setShowWindow(null)
    }

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
