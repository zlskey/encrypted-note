import { useRef, useEffect } from 'react'

import { Background, Content } from './Window.styles'

const Window = ({
    children,
    showWindow,
    setShowWindow,
    onClickClosing = false,
    customStyles = {},
}) => {
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            {showWindow && (
                <Background onClick={closeWindow}>
                    <Content ref={content} customStyles={customStyles}>
                        {children}
                    </Content>
                </Background>
            )}
        </>
    )
}

export default Window
