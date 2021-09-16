import { useContext, useState } from 'react';
import styled from 'styled-components';
import Form from './Form'
import InputField from '@components/InputField'
import { UserContext } from '@contexts/UserContext'
import fetchApi from '@helpers/fetchApi'
import { setError, isFormUnfilled } from '@helpers/InputErrorHandler'

const EmailSettings = () => {
    const [showEmailSettings, setShowEmailSettings] = useState(false);
    const [mail, setMail] = useState('');
    const { user, setUser } = useContext(UserContext)

    const handleSubmit = e => {
        e.preventDefault()

        if (isFormUnfilled({ mail })) return

        fetchApi('/user/mail', { mail })
            .then(res => {
                if (res.ok) {
                    setUser(res.content)
                    setShowEmailSettings(false)
                }
                else setError('res', res.error)
            })
    }

    return (
        <>
            <Button
                color="#03a9f4"
                className='clickable'
                onClick={() => setShowEmailSettings(!showEmailSettings)}
            >
                {user.mail
                    ? 'Change your mail'
                    : 'Set mail'
                }
            </Button>

            {showEmailSettings &&
                <Form
                    handleSubmit={handleSubmit}
                    setShowForm={setShowEmailSettings}
                >
                    <div className="error hide res"></div>
                    <InputField
                        name='mail'
                        text='Mail'
                        content={mail}
                        setContent={setMail}
                    />
                </Form>
            }

        </>
    );
}

const Button = styled.button`
    width: 100%;
    aspect-ratio: 20/3;
    font-size: 18px;
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

export default EmailSettings;