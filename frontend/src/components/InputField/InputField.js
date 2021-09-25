import { useContext } from 'react'
import { ThemeContext } from '@contexts/ThemeContext'
import { InputFieldDiv, Label, Input, Error } from './InputField.styles'

const InputField = ({
    name,
    text,
    type = 'text',
    content,
    setContent,
    ...props
}) => {
    const { theme } = useContext(ThemeContext)

    return (
        <InputFieldDiv className='input-field'>
            <Label htmlFor={name}>{text}</Label>
            <Input
                theme={theme}
                type={type}
                id={name}
                value={content}
                onChange={e => setContent(e.target.value)}
                spellCheck='off'
                autoComplete='off'
                {...props}
            />
            <Error className={`${name} error`} />
        </InputFieldDiv>
    )
}

export default InputField
