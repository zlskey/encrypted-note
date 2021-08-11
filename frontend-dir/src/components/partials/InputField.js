import { useContext } from 'react';
import styled from 'styled-components'
import { ThemeContext } from '../../contexts/ThemeContext';

const InputFieldDiv = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 20px;
    text-align: left;
`

const Label = styled.label`
        margin-bottom: 5px;
        font-size: 1.2rem;
`

const Input = styled.input`
        border-radius: 5px;
        border: none;
        outline: none;
        padding: 10px;
        font-size: 1em;

        color: inherit;
        background-color: ${({ theme }) => theme.bgColor};
        box-shadow: ${({ theme }) => theme.shadow}
`

const InputField = ({ name, text, type = 'text', content, setContent, ...props }) => {
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
            <div className={`${name} error hide`} />
        </InputFieldDiv>
    );
}

export default InputField