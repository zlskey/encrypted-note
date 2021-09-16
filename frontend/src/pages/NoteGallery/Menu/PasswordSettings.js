import { IconLock } from '@tabler/icons';
import { useContext, useState } from 'react'
import styled from "styled-components";

import { isFormUnfilled, setError } from '@helpers/InputErrorHandler'
import { getSize } from "@helpers/responsiveFacilities";
import fetchApi from '@helpers/fetchApi';
import { ThemeContext } from '@contexts/ThemeContext';
import InputField from '@components/InputField'
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
    box-shadow: ${({ theme }) => theme.type === 'light' && theme.shadow};
`

const EncryptionSettings = () => {
    const { theme } = useContext(ThemeContext)

    const [showForm, setShowForm] = useState(false);

    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setnewPassword] = useState('');

    const changePassword = async e => {
        e.preventDefault()

        if (isFormUnfilled({ currentPassword, newPassword })) return

        const res = await fetchApi('/settings/change-password', { currentPassword, newPassword }, 'PATCH')
        if (res.ok) setShowForm(false)
        else setError('res', res.error)
    }

    return (
        <>
            <Button
                color="#03a9f4"
                theme={theme}
                className='clickable'
                onClick={() => setShowForm(!showForm)}
            >
                Change password <IconLock />
            </Button>


            {showForm &&
                <Form setShowForm={setShowForm} handleSubmit={changePassword}>
                    <InputField name='currentPassword' text='Current password' type='password' content={currentPassword} setContent={setCurrentPassword} />
                    <InputField name='newPassword' text='New password' type='password' content={newPassword} setContent={setnewPassword} />
                </Form>
            }

        </>
    );
}

export default EncryptionSettings;