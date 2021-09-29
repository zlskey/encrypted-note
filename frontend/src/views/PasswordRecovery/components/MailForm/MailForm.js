import { useState } from 'react'
import InputField from '@commons/InputField/InputField'
import Button from '@commons/Button/Button'
import { setError, setValid } from '@helpers/InputErrorHandler'
import useApi from '@hooks/useApi'
import { Info } from './MailForm.styles'

const MailSending = () => {
    const [mail, setMail] = useState('')
    const [InfoMessage, setInfoMessage] = useState('')

    const [doFetch, status] = useApi('/auth/send-recover-mail', 'POST')

    const handleMailSending = async e => {
        e.preventDefault()

        setValid('res')
        doFetch(
            (content, ok) => {
                if (ok) setInfoMessage('Mail is sent')
                else setError('res', content)
            },
            { mail }
        )
    }

    return (
        <form onSubmit={handleMailSending}>
            {InfoMessage ? (
                <Info>{InfoMessage}</Info>
            ) : (
                <>
                    <p style={{ fontSize: '17px' }}>
                        If you want to recover your password and you have your
                        mail connected with your account. Just tipe it right
                        here and check your mailbox{' '}
                    </p>
                    <InputField
                        name='mail'
                        text='Your mail'
                        content={mail}
                        setContent={setMail}
                        required={true}
                    />
                    <Button
                        loading={status === 'fetching'}
                        content='Send mail with link'
                    />
                </>
            )}
        </form>
    )
}

export default MailSending
