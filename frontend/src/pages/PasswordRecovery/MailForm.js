import { useState } from 'react';
import InputField from '@components/InputField'
import Button from '@components/Button'
import { isFormUnfilled, setError, setValid } from '@helpers/InputErrorHandler'
import fetchApi from '@helpers/fetchApi'
import styled from 'styled-components';

const MailSending = () => {
    const [mail, setMail] = useState('');
    const [InfoMessage, setInfoMessage] = useState('');

    const handleMailSending = async (e) => {
        e.preventDefault()

        if (isFormUnfilled({ mail })) return

        const res = await fetchApi('/auth/send-recover-mail', { mail })

        if (res.ok) setInfoMessage('Mail is sent')
        else setError('res', res.error)

    }

    return (
        <form onSubmit={handleMailSending}>

            {InfoMessage
                ? <Info>{InfoMessage}</Info>
                : <>
                    <p style={{ fontSize: '17px' }}>If you want to recover your password and you have your mail connected with your account. Just tipe it right here and check your mailbox </p>
                    <InputField
                        name='mail'
                        text='Your mail'
                        content={mail}
                        setContent={setMail}
                    />
                    <Button content='Send mail with link' />
                </>
            }


        </form>

    );
}

const Info = styled.div`
    background-color: #43a047;
    color: #fafafa;
    margin: 8px;
    font-weight: 400;
    font-size: 1rem;
    border-radius: 5px;
    padding:10px;
`

export default MailSending;