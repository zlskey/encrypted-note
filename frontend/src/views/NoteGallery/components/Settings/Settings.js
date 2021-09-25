import { IconSettings } from '@tabler/icons'
import { useContext, useEffect, useState } from 'react'
import { ThemeContext } from '@contexts/ThemeContext'
import { UserContext } from '@contexts/UserContext'
import CloseOnOuterClick from '@components/CloseOnOuterClick/CloseOnOuterClick'
import Window from '@components/Window/Window'
import { Link } from 'react-router-dom'

import SettingComponent from './atoms/SettingComponent/SettingComponent'
import MailSetting from './atoms/MailSetting/MailSetting'
import PinSetting from './atoms/PinSetting/PinSetting'
import ThemeSetting from './atoms/ThemeSetting/ThemeSetting'
import PasswordSetting from './atoms/PasswordSetting/PasswordSetting'

import {
    settingsWindowStyles,
    LogoutButton,
    Header,
    SettingsButton,
} from './Settings.styles'

const Settings = ({ setBlurContent, blurContent }) => {
    const { theme } = useContext(ThemeContext)
    const { user } = useContext(UserContext)

    const [showSettings, setShowSettings] = useState(false)

    const [showMailSetting, setShowMailSetting] = useState(false)
    const [showPasswordSetting, setShowPasswordSetting] = useState(false)
    const [showPinSetting, setShowPinSetting] = useState(false)

    useEffect(
        () => setBlurContent(showSettings),
        [showSettings, setBlurContent]
    )

    return (
        <>
            <SettingsButton
                theme={theme}
                className='clickable'
                onClick={() => {
                    if (blurContent && !showSettings) return
                    setShowSettings(!showSettings)
                }}
                style={{ filter: `${blurContent ? 'blur(2px)' : ''}` }}
            >
                <IconSettings
                    color={theme.fontColor}
                    size='40px'
                    style={{ opacity: 0.8 }}
                />
            </SettingsButton>

            <Window
                showWindow={showSettings}
                setShowWindow={setShowSettings}
                onClickClosing={true}
                customStyles={settingsWindowStyles}
            >
                <Header>Settings</Header>

                <ThemeSetting />

                <SettingComponent
                    value={''}
                    description={`Username: ${user.username}`}
                />

                <SettingComponent
                    value={user.mail || 'click'}
                    description={
                        user.mail ? 'Your mail: ' : 'Add mail to your account: '
                    }
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
                        <PasswordSetting
                            setShowPasswordSetting={setShowPasswordSetting}
                        />
                    </CloseOnOuterClick>
                </SettingComponent>

                <SettingComponent
                    value='click'
                    description={
                        user.encryption ? 'Change PIN: ' : 'Start encryption '
                    }
                    setShowSetting={setShowPinSetting}
                    showSetting={showPinSetting}
                >
                    <CloseOnOuterClick setSomething={setShowPinSetting}>
                        <PinSetting setShowPinSetting={setShowPinSetting} />
                    </CloseOnOuterClick>
                </SettingComponent>

                <LogoutButton color='#f44336' theme={theme}>
                    <Link to='/auth' className='clickable'>
                        {' '}
                        Logout
                    </Link>
                </LogoutButton>
            </Window>
        </>
    )
}

export default Settings
