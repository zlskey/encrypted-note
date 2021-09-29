import { IconSettings } from '@tabler/icons'
import { useContext, useState } from 'react'

import CloseOnOuterClick from '@commons/CloseOnOuterClick/CloseOnOuterClick'
import Window from '@commons/Window/Window'
import Button from '@commons/Button/Button'

import SettingComponent from './atoms/SettingComponent/SettingComponent'
import MailSetting from './atoms/MailSetting/MailSetting'
import PasswordSetting from './atoms/PasswordSetting/PasswordSetting'
import PinSetting from './atoms/PinSetting/PinSetting'
import ThemeSetting from './atoms/ThemeSetting/ThemeSetting'
import { AlertContext } from '@contexts/AlertContext'
import { useSelector, useDispatch } from 'react-redux'
import { LOGOUT_USER } from '@redux/types'
import useApi from '@hooks/useApi'

import {
    settingsWindowStyles,
    Header,
    SettingsButton,
    LogoutButton,
} from './Settings.styles'

const Settings = () => {
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()

    const { setAlert } = useContext(AlertContext)

    const [showSettings, setShowSettings] = useState(false)
    const [showMailSetting, setShowMailSetting] = useState(false)
    const [showPasswordSetting, setShowPasswordSetting] = useState(false)
    const [showPinSetting, setShowPinSetting] = useState(false)

    const [doFetch, status] = useApi('/user/logout')

    const handleLogout = () => {
        if (!user) return

        doFetch((content, ok) => {
            if (ok) {
                dispatch({ type: LOGOUT_USER })
                setAlert('success', 'Come back soon 😊')
            }
        })
    }

    return (
        <>
            <SettingsButton
                onClick={() => setShowSettings(currentState => !currentState)}
                className='clickable'
            >
                <IconSettings size='40px' style={{ opacity: 0.8 }} />
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

                <LogoutButton onClick={handleLogout}>
                    <Button
                        color='#f44336'
                        content='Logout'
                        loading={status === 'fetching'}
                    />
                </LogoutButton>
            </Window>
        </>
    )
}

export default Settings
