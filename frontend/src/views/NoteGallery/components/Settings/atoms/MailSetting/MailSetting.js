import { useContext, useState } from 'react'
import { useDispatch } from 'react-redux'

import useApi from '@hooks/useApi'
import { AlertContext } from '@contexts/AlertContext'
import InputField from '@commons/InputField/InputField'
import {} from '@helpers/InputErrorHandler'
import { UPDATE_USER } from '@redux/types'

const MailSetting = ({ setShowMailSetting }) => {
    const [mail, setMail] = useState('')
    const { setAlert } = useContext(AlertContext)
    const dispatch = useDispatch()

    const [doFetch] = useApi('/user/mail', 'POST')

    const mailHandler = e => {
        e.preventDefault()

        setAlert('loading')
        doFetch(
            (content, ok) => {
                if (ok) {
                    dispatch({ type: UPDATE_USER, data: content })
                    setAlert('success', 'Mail changed')
                    setShowMailSetting(false)
                } else setAlert('error', content)
            },
            { mail }
        )
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
