import fetchApi from '@helpers/fetchApi'
import { useContext, useState } from 'react'
import { UserContext } from '@contexts/UserContext'
import { AlertContext } from '@contexts/AlertContext'
import InputField from '@components/InputField/InputField'
import { isFormUnfilled } from '@helpers/InputErrorHandler'

const MailSetting = ({ setShowMailSetting }) => {
    const [mail, setMail] = useState('')
    const { setAlert } = useContext(AlertContext)
    const { setUser } = useContext(UserContext)

    const mailHandler = e => {
        e.preventDefault()

        if (isFormUnfilled({ mail })) return

        fetchApi('/user/mail', { mail }).then(res => {
            if (res.ok) {
                setAlert('success', 'Mail changed')
                setUser(res.content)
                setShowMailSetting(false)
            } else setAlert('error', res.error)
        })
    }

    return (
        <form onSubmit={mailHandler}>
            <InputField
                name='mail'
                text='Mail'
                content={mail}
                setContent={setMail}
            />
        </form>
    )
}

export default MailSetting
