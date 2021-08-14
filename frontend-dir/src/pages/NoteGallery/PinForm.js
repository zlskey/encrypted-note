import { useContext, useState } from 'react'
import styled from 'styled-components';

import { ThemeContext } from '@contexts/ThemeContext';
import InputField from '@components/InputField';
import fetchApi from '@helpers/fetchApi';
import { isFormUnfilled, setError } from '@helpers/InputErrorHandler';

const PinFormDiv = styled.div`
    z-index: 10;
    border-radius: 10px;
    margin-inline: auto;
    background-color: ${({ theme }) => theme.uiColor};
    box-shadow: ${({ theme }) => theme.shadow};
    color: ${({ theme }) => theme.fontColor};
    transition: 0.1s;
    overflow: hidden;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    width: 400px;
    padding: 20px 40px;
    text-align: center;

    @media screen and (max-width: 700px) {
        width: 95vw;
    }

    h2 {
        font-weight: 300;
    }
`

const Button = styled.button`
    width: 70%;
    aspect-ratio: 20/3;
    background-color: #03a9f4;
    color: #fafafa;
    box-shadow: ${({ theme }) => theme.shadow};
    outline: none;
    border:none;
    margin-top: 30px;
    padding-block: 10px;
`

const PinForm = ({ setNotes, setSharedNotes, setShowPinForm }) => {
    const { theme } = useContext(ThemeContext)
    const [pin, setPin] = useState('');

    const getNotes = async e => {
        e.preventDefault()

        if (isFormUnfilled({ pin })) return

        const res = await fetchApi('/user/notes', { pin })
        if (res.ok) {
            setNotes(res.content.userNotes)
            setSharedNotes(res.content.sharedNotes)
            setShowPinForm(false)
        } else setError('pin', res.error)

    }

    return (
        <PinFormDiv theme={theme}>
            <h2>Enter your PIN</h2>
            <form onSubmit={e => getNotes(e)}>

                <InputField name='pin' type='password' content={pin} setContent={setPin} autoFocus={true} />

                <Button className='clickable'> Decrypt data </Button>
            </form>
        </PinFormDiv>
    );
}

export default PinForm