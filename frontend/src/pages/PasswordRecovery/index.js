import { useLocation, Link } from 'react-router-dom';
import { IconArrowLeft } from "@tabler/icons"
import styled from 'styled-components'
import { useContext } from 'react';

import { ThemeContext } from '@contexts/ThemeContext'
import PasswordForm from './PasswordForm';
import MailForm from './MailForm';

const PasswordRecovery = () => {
    const { theme } = useContext(ThemeContext)

    const search = useLocation().search;
    const id = new URLSearchParams(search).get('id');

    return (
        <Container>
            <Window theme={theme}>
                <ReturnIcon>
                    <Link to='/auth'>
                        <IconArrowLeft
                            size="25px"
                            stroke='1.3'
                            className='clickable'
                            color={theme.fontColor}
                        />
                    </Link>
                </ReturnIcon>

                <div className="res error hide"></div>
                <h1>Password recovery</h1>

                {id
                    ? <PasswordForm id={id} />
                    : <MailForm />
                }
            </Window>
        </Container>
    );
}

const Container = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    display: grid;
    place-items: center;
`

const Window = styled.div`
    width: min(90vw, 400px);
    box-shadow: 0 0 10px -5px #212121;
    padding: 20px 40px;
    text-align: center;
    border-radius: 5px;
    background-color: ${(props) => props.theme.uiColor};
    color: ${(props) => props.theme.fontColor};
    position: relative;
`

const ReturnIcon = styled.div`
    position: absolute;
    left: 10px;
    top: 10px;
`

export default PasswordRecovery;