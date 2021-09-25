import { useContext } from 'react'
import NoteGallery from '@views/NoteGallery/NoteGallery'
import AuthPage from '@views/Auth/Auth'
import PasswordRecovery from '@views/PasswordRecovery/PasswordRecovery'
import ThemeContextProvider from './contexts/ThemeContext'
import AlertContextProvider from './contexts/AlertContext'
import UserContextProvider, { UserContext } from './contexts/UserContext'
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from 'react-router-dom'

const App = () => {
	return (
		<ThemeContextProvider>
			<AlertContextProvider>
				<UserContextProvider>
					<AppRouter />
				</UserContextProvider>
			</AlertContextProvider>
		</ThemeContextProvider>
	)
}

const AppRouter = () => {
	const { user } = useContext(UserContext)

	return (
		<Router>
			<Switch>
				<Route path="/auth" component={AuthPage} />
				<Route path="/password-recovery" component={PasswordRecovery} />

				{user ? (
					<Route path="/" component={NoteGallery} />
				) : (
					<Redirect to="/auth" />
				)}
			</Switch>
		</Router>
	)
}

export default App
