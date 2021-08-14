import { useContext, useState } from 'react'
import styled from 'styled-components';

import { LoginForm, SignUpForm, TryForm } from './Forms'
import { ThemeContext } from '@contexts/ThemeContext';

const AuthPageDiv = styled.div`
    transform: translateX(-50%) translateY(-50%);
    padding: 20px 10px;
    font-size: 18px;
    border-radius: 10px;
    transition: 0.3s;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    position: absolute;
    top: 50%;
    left: 50%;
    width: 400px;

    @media screen and (max-width: 700px) {
        width: 95vw;
    }
    
    color: ${({ theme }) => theme.fontColor};
    background-color: ${({ theme }) => theme.uiColor};
    box-shadow: ${({ theme }) => theme.shadow};

    h2 {
        font-size: 2rem;
    }
`

const ActionSwitch = styled.div`
    width: 70%;
    height: 40px;
    border-radius: 1000px;
    display: flex;
    flex-direction: row;
    align-items: stretch;
    justify-content: space-around;
    box-shadow: ${({ theme }) => theme.shadow};
    margin-top: 10px;
    overflow: hidden;

    p {
        flex-grow: 1;
        display: grid;
        place-items: center;
        transition: 0.3s;

        &:not(.active) {
            border: 2px solid ${({ theme }) => theme.uiColor};
        }
    }

    .active {
        color: #fafafa;
        background-color:#2196f3;
    }
`

const Main = () => {
    const { theme } = useContext(ThemeContext)

    const [action, setAction] = useState('login');

    return (
        <>
            <AuthPageDiv theme={theme}>

                <ActionSwitch theme={theme}>
                    <p onClick={() => setAction('login')} className={`clickable ${action === 'login' ? 'active' : ''}`}>
                        Login
                    </p>
                    <p onClick={() => setAction('signup')} className={`clickable ${action === 'signup' ? 'active' : ''}`}>
                        Sign Up
                    </p>
                    <p onClick={() => setAction('try')} className={`clickable ${action === 'try' ? 'active' : ''}`}>
                        Try
                    </p>
                </ActionSwitch>

                <LoginForm action={action} />
                <SignUpForm action={action} />
                <TryForm action={action} />

            </AuthPageDiv>
        </>
    );
}

export default Main;