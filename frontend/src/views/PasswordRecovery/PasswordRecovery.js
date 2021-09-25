import { useLocation, Link } from 'react-router-dom'
import { IconArrowLeft } from '@tabler/icons'
import { useContext } from 'react'

import { ThemeContext } from '@contexts/ThemeContext'
import PasswordForm from './components/PasswordForm/PasswordForm'
import MailForm from './components/MailForm/MailForm'
import { Container, Window, ReturnIcon } from './PasswordRecovery.styles'

const PasswordRecovery = () => {
    const { theme } = useContext(ThemeContext)

    const search = useLocation().search
    const id = new URLSearchParams(search).get('id')

    return (
        <Container>
            <Window theme={theme}>
                <ReturnIcon>
                    <Link to='/auth'>
                        <IconArrowLeft
                            size='25px'
                            stroke='1.3'
                            className='clickable'
                            color={theme.fontColor}
                        />
                    </Link>
                </ReturnIcon>

                <div className='res error hide'></div>
                <h1>Password recovery</h1>

                {id ? <PasswordForm id={id} /> : <MailForm />}
            </Window>
        </Container>
    )
}

export default PasswordRecovery
