import { StyledButton } from './Button.styles'
import Loader from '@components/Loader/Loader'
import { useState, useEffect, useRef } from 'react'

const Button = ({ content, loading = false, color = '#2196f3' }) => {
    const buttonElement = useRef(null)
    const [defaultSize, setDefaultSize] = useState({})

    useEffect(() => {
        if (!buttonElement.current) return

        const width = buttonElement.current.offsetWidth
        const height = buttonElement.current.offsetHeight

        setDefaultSize({ width, height })
    }, [buttonElement])

    return (
        <StyledButton
            ref={buttonElement}
            size={defaultSize}
            color={color}
            className='clickable'
        >
            {loading ? <Loader /> : content}
        </StyledButton>
    )
}

export default Button
