import styled from 'styled-components';
import { IconSettings } from '@tabler/icons';
import { useContext, useEffect, useState } from 'react';
import { ThemeContext } from '@contexts/ThemeContext';
import { UserContext } from '@contexts/UserContext';
import SettingComponent from './SettingComponent'
import MailSetting from './MailSetting';
import PinSetting from './PinSetting';
import ThemeSetting from './ThemeSetting';
import PasswordSetting from './PasswordSetting';
import CloseOnOuterClick from '@components/CloseOnOuterClick'
import { Link } from 'react-router-dom'

const Settings = ({ setBlurContent, blurContent }) => {
    const { theme } = useContext(ThemeContext)
    const { user } = useContext(UserContext)

    const [showSettings, setShowSettings] = useState(false);

    const [showMailSetting, setShowMailSetting] = useState(false);
    const [showPasswordSetting, setShowPasswordSetting] = useState(false);
    const [showPinSetting, setShowPinSetting] = useState(false);
    useEffect(() => setBlurContent(showSettings), [showSettings, setBlurContent])

    return (
        <Background>
            <SettingsButton
                theme={theme}
                className='clickable'
                onClick={() => {
                    if (blurContent && !showSettings) return
                    setShowSettings(!showSettings)
                }}
                style={{ filter: `${blurContent ? "blur(2px)" : ""}`, }}
            >
                <IconSettings color={theme.fontColor} size='40px' style={{ opacity: 0.8 }} />
            </SettingsButton>

            {showSettings &&
                <Container theme={theme}>
                    <CloseOnOuterClick setSomething={setShowSettings}>
                        <Window theme={theme}>
                            <Header>Settings</Header>

                            <ThemeSetting />

                            <SettingComponent value={''} description={`Username: ${user.username}`} />

                            <SettingComponent
                                value={user.mail || 'click'}
                                description={user.mail ? 'Your mail: ' : 'Add mail to your account: '}
                                setShowSetting={setShowMailSetting}
                                showSetting={showMailSetting}
                            >
                                <CloseOnOuterClick setSomething={setShowMailSetting}>
                                    <MailSetting setShowMailSetting={setShowMailSetting} />
                                </CloseOnOuterClick>
                            </SettingComponent>

                            <SettingComponent
                                value={'click'}
                                description={'Change password: '}
                                setShowSetting={setShowPasswordSetting}
                                showSetting={showPasswordSetting}
                            >
                                <CloseOnOuterClick setSomething={setShowPasswordSetting}>
                                    <PasswordSetting setShowPasswordSetting={setShowPasswordSetting} />
                                </CloseOnOuterClick>
                            </SettingComponent>

                            <SettingComponent
                                value='click'
                                description={user.encryption ? 'Change PIN: ' : 'Start encryption '}
                                setShowSetting={setShowPinSetting}
                                showSetting={showPinSetting}
                            >
                                <CloseOnOuterClick setSomething={setShowPinSetting}>
                                    <PinSetting setShowPinSetting={setShowPinSetting} />
                                </CloseOnOuterClick>
                            </SettingComponent>

                            <LogoutButton color='#f44336' theme={theme} >
                                <Link to='/auth' className='clickable'> Logout</Link>
                            </LogoutButton>

                        </Window>
                    </CloseOnOuterClick>
                </Container>
            }

        </Background>
    );
}

const Background = styled.div`
    width: 100vw;
    height: 100vh;
    position: absolute;
    left: 0;
    top: 0;
    background-color: transparent;
`

const LogoutButton = styled.div`
    display: block;
    margin: 0 auto;
    text-align: center;

    a {
        font-size: 20px;
        outline: none;
        border: none;
        display: inline-block;
        margin:0 auto;
        padding: 0.5rem 3rem;
        color: #fafafa;
        text-decoration: none;
        background-color: ${({ color }) => color};
    }
`

const Header = styled.h1`
    text-align: center;
    padding-block: 0.5rem;
`

const Window = styled.div`
    background-color: ${(props => props.theme.uiColor)};
    box-shadow: ${(props => props.theme.type === 'light' && props.theme.shadow)};
    width: min(500px, 90vw);
    border-radius: 0.5rem;
    padding-inline: 2rem;
    padding-bottom: 1rem;
    margin-block: 3rem;

    @media (max-width: 500px) {
        padding-inline: 1rem;
    }
`

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    position: absolute;
    top: 0;
    left: 0;
    display: grid;
    place-items: center;
    color: ${props => props.theme.fontColor};
`

const SettingsButton = styled.button`
    background-color: ${({ theme }) => theme.uiColor};
    box-shadow: ${({ theme }) => theme.type === 'light' && theme.shadow};
    border: none;
    outline: none;
    border-radius: 50%;
    width: 50px;
    aspect-ratio: 1/1;
    margin-top: 15px;
    position: absolute;
    left: 1rem;
    bottom: 1rem;
`

export default Settings;