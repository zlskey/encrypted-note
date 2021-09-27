import useApi from '@hooks/useApi'
import { AlertContext } from '@contexts/AlertContext'
import { IconMoonStars, IconBrightness2 } from '@tabler/icons'
import { ThemeContext } from '@contexts/ThemeContext'
import { useContext } from 'react'
import { SwitchContainer, Switch } from './ThemeSetting.styles'

const ThemeSetting = () => {
    const { setAlert } = useContext(AlertContext)
    const { theme, setIsDarkTheme } = useContext(ThemeContext)

    const [doFetch] = useApi('/settings/theme', 'PATCH')

    const handleClick = async () => {
        setIsDarkTheme(prev => !prev)

        doFetch((content, ok) => {
            if (!ok) setAlert('error', content)
        })
    }

    return (
        <SwitchContainer>
            <IconMoonStars />
            <Switch theme={theme} onClick={handleClick} />
            <IconBrightness2 />
        </SwitchContainer>
    )
}

export default ThemeSetting
