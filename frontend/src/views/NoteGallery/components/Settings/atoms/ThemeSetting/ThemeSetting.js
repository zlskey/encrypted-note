import fetchApi from '@helpers/fetchApi'
import { AlertContext } from '@contexts/AlertContext'
import { IconMoonStars, IconBrightness2 } from '@tabler/icons'
import { ThemeContext } from '@contexts/ThemeContext'
import { useContext } from 'react'
import { SwitchContainer, Switch } from './ThemeSetting.styles'

const ThemeSetting = () => {
    const { setAlert } = useContext(AlertContext)
    const { theme, setIsDarkTheme } = useContext(ThemeContext)

    const handleClick = async () => {
        const res = await fetchApi('/settings/theme', {}, 'PATCH')
        if (res.ok) setIsDarkTheme(prev => !prev)
        else setAlert('error', res.error)
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
