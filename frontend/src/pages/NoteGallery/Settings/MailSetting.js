import fetchApi from '@helpers/fetchApi'
import { useContext, useState } from 'react';
import { UserContext } from '@contexts/UserContext';
import { AlertContext } from '@contexts/AlertContext';
import InputField from '@components/InputField'
import { isFormUnfilled } from '@helpers/InputErrorHandler'

const MailSetting = ({ setShowMailSetting }) => {
    const [mail, setMail] = useState('');
    const { setType, setContent } = useContext(AlertContext)
    const { setUser } = useContext(UserContext)

    const mailHandler = e => {
        e.preventDefault()

        if (isFormUnfilled({ mail })) return

        fetchApi('/user/mail', { mail })
            .then(
                res => {
                    if (res.ok) {
                        setType('success')
                        setContent('Mail changed')
                        setUser(res.content)
                        setShowMailSetting(false)
                    }
                    else {
                        setType('error')
                        setContent(res.error)
                    }
                }
            )
    }

    return (
        <>
            <form onSubmit={mailHandler}>
                <InputField
                    name='mail'
                    text='Mail'
                    content={mail}
                    setContent={setMail}
                />
            </form>
        </>
    );
}

export default MailSetting;