import { StyledButton } from './Button.styles'

const Button = ({ content, ...props }) => {
    return (
        <StyledButton className='clickable' {...props}>
            {content}
        </StyledButton>
    )
}

export default Button
