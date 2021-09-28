import useApi from '@hooks/useApi'
import { AlertContext } from '@contexts/AlertContext'
import { IconMoonStars, IconBrightness2 } from '@tabler/icons'
import { useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { SwitchContainer, Switch } from './ThemeSetting.styles'
import { UPDATE_USER } from '@redux/types'

const ThemeSetting = () => {
    const { setAlert } = useContext(AlertContext)
    const { theme } = useSelector(state => state.user)
    const dispatch = useDispatch()

    const [doFetch] = useApi('/settings/theme', 'PATCH')

    const handleThemeChange = async () => {
        document.documentElement.setAttribute(
            'data-theme',
            theme === 'light' ? 'dark' : 'light'
        )

        doFetch((content, ok) => {
            if (!ok) setAlert('error', content)

            dispatch({
                type: UPDATE_USER,
                data: { theme: content },
            })
        })
    }

    return (
        <SwitchContainer>
            <IconMoonStars />
            <Switch>
                <input
                    className='hide'
                    id='theme-checkbox'
                    type='checkbox'
                    onChange={handleThemeChange}
                    checked={theme === 'light'}
                />
                <label htmlFor='theme-checkbox'></label>
            </Switch>
            <IconBrightness2 />
        </SwitchContainer>
    )
}

export default ThemeSetting
