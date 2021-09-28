import { useLocation, Link } from 'react-router-dom'
import { IconArrowLeft } from '@tabler/icons'

import PasswordForm from './components/PasswordForm/PasswordForm'
import MailForm from './components/MailForm/MailForm'
import { Container, Window, ReturnIcon } from './PasswordRecovery.styles'

const PasswordRecovery = () => {
    const search = useLocation().search
    const id = new URLSearchParams(search).get('id')

    return (
        <Container>
            <Window>
                <ReturnIcon>
                    <Link to='/auth'>
                        <IconArrowLeft
                            size='25px'
                            stroke='1.3'
                            className='clickable'
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
