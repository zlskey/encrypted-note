import { useContext } from "react"
import NoteGallery from "@pages/NoteGallery"
import AuthPage from "@pages/Auth"
import PasswordRecovery from "@pages/PasswordRecovery"
import ThemeContextProvider from "./contexts/ThemeContext"
import UserContextProvider, { UserContext } from "./contexts/UserContext"
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from "react-router-dom"

const App = () => {
	return (
		<ThemeContextProvider>
			<UserContextProvider>

				<AppRouter />
			</UserContextProvider>
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

				{user
					? <Route path="/" component={NoteGallery} />
					: <Redirect to="/auth" />
				}

			</Switch>
		</Router>
	)
}

export default App
