import styled from 'styled-components'
import fetchApi from '@helpers/fetchApi'
import { AlertContext } from '@contexts/AlertContext'
import { IconMoonStars, IconBrightness2 } from '@tabler/icons'
import { ThemeContext } from '@contexts/ThemeContext'
import { useContext } from 'react'

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

const SwitchContainer = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	gap: 0.3rem;
`

const Switch = styled.div`
	border-radius: 9999px;
	height: 25px;
	aspect-ratio: 2/1;
	position: relative;
	transition: 0.3s;
	display: flex;
	align-items: center;
	justify-content: flex-start;
	box-sizing: content-box;
	cursor: pointer;
	&::after {
		content: '';
		width: 25px;
		aspect-ratio: 1/1;
		border-radius: 50%;
		transition: 0.3s;
		display: inline-block;

		transform: ${({ theme }) =>
			theme.type === 'light' ? 'translateX(100%)' : ''};
		background-color: ${({ theme }) => theme.fontColor};
	}

	border: 3px solid ${({ theme }) => theme.bgColor};
	background-color: ${({ theme }) => theme.bgColor};
	box-shadow: ${({ theme }) => theme.shadow};
`

export default ThemeSetting
