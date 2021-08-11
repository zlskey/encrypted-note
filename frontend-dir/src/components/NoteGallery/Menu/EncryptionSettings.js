import { useContext, useState } from 'react'
import { IconLock } from '@tabler/icons';
import styled from "styled-components";

import { ThemeContext } from '../../../contexts/ThemeContext';
import { UserContext } from '../../../contexts/UserContext'
import InputField from '../../partials/InputField'
import { getSize } from "../../../scripts/responsiveFacilities";
import { isFormUnfilled, setError } from '../../../scripts/InputErrorHandler'
import fetchApi from '../../../scripts/fetchApi';
import Form from './Form';

const Button = styled.button`
    width: 100%;
    aspect-ratio: 20/3;
    font-size: ${getSize()};
    outline: none;
    border: none;
    color: #fafafa;    
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 5px;
    margin-block: 15px;
    font-weight: 500;

    background-color: ${({ color }) => color};
    box-shadow: ${({ theme }) => theme.shadow};
`

const EncryptionSettings = () => {
    const { theme } = useContext(ThemeContext)
    const { user, setUser } = useContext(UserContext)
    const [showSetPinForm, setShowSetPinForm] = useState(false);
    const [showChangePinForm, setShowChangePinForm] = useState(false);

    const [pin, setPin] = useState('');

    const [currentPin, setCurrentPin] = useState('');
    const [newPin, setNewPin] = useState('');

    const startEncryption = e => {
        e.preventDefault()
        if (isFormUnfilled({ pin })) return

        fetchApi('/start-encryption', { pin }, 'PATCH')
            .then(res => {
                if (res.ok) {
                    setUser(res.content)
                    setShowSetPinForm(false)
                }
                else setError('pin', res.error)
            })
    }

    const changePin = e => {
        e.preventDefault()

        if (isFormUnfilled({ currentPin, newPin })) return

        fetchApi('/change-pin', { currentPin, newPin }, 'PATCH')
            .then(res => {
                if (res.ok) setShowChangePinForm(false)
                else setError('res', res.error)
            })
    }

    return (
        <>
            <Button
                color="#03a9f4"
                theme={theme}
                className='clickable'
                onClick={() => user.encryption ? setShowChangePinForm(value => !value) : setShowSetPinForm(value => !value)}
            >
                {user.encryption ? 'Change PIN' : 'Turn on encryption'} <IconLock />
            </Button>

            {showSetPinForm &&
                <Form setShowForm={setShowSetPinForm} handleSubmit={startEncryption}>
                    <InputField name='pin' text='PIN to encrypt files' type='password' content={pin} setContent={setPin} />
                </Form>
            }

            {showChangePinForm &&
                <Form setShowForm={setShowChangePinForm} handleSubmit={changePin}>
                    <InputField name='currentPin' text='Current PIN' type='password' content={currentPin} setContent={setCurrentPin} />
                    <InputField name='newPin' text='New PIN' type='password' content={newPin} setContent={setNewPin} />
                </Form>
            }

        </>
    );
}

export default EncryptionSettings;