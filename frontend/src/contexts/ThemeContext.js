import { createContext, useEffect, useState } from 'react'

export const ThemeContext = createContext(null)

const darkTheme = {
	type: 'dark',
	fontColor: '#fafafa',
	bgColor: '#212121',
	uiColor: '#424242',
	shadow: '0 0 3px #616161',
}
const lightTheme = {
	type: 'light',
	fontColor: '#424242',
	bgColor: '#fafafa',
	uiColor: '#eeeeee',
	shadow: '0 0 10px -5px #212121',
}

const ThemeContextProvider = ({ children }) => {
	const [theme, setTheme] = useState(lightTheme)
	const [isDarkTheme, setIsDarkTheme] = useState(false)

	useEffect(
		() => (document.body.style.backgroundColor = theme.bgColor),
		[theme]
	)
	useEffect(
		() => setTheme(isDarkTheme ? darkTheme : lightTheme),
		[isDarkTheme]
	)

	return (
		<ThemeContext.Provider value={{ theme, setIsDarkTheme }}>
			{children}
		</ThemeContext.Provider>
	)
}

export default ThemeContextProvider
