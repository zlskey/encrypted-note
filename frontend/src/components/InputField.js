import { useContext } from 'react';
import styled from 'styled-components'
import { ThemeContext } from '@contexts/ThemeContext';

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
            <Error className={`${name} error`} />
        </InputFieldDiv>
    );
}

const InputFieldDiv = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    margin-top: 20px;
    text-align: left;
    position: relative;
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
        font-weight: 300;
        font-family: "Roboto", sans-serif;

        color: inherit;
        background-color: ${({ theme }) => theme.bgColor};
        box-shadow: ${({ theme }) => theme.type === 'light' && theme.shadow};
`

const Error = styled.div`
    background-color: transparent;
    color: #f44336;
    padding: 0;
    margin: 5px 0;
`

export default InputField