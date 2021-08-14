import { useContext } from 'react';
import NoteGallery from '@pages/NoteGallery';
import AuthPage from '@pages/Auth';
import ThemeContextProvider from './contexts/ThemeContext';
import UserContextProvider, { UserContext } from './contexts/UserContext';

const App = () => {
  return (
    <ThemeContextProvider>
      <UserContextProvider>

        <ViewHandler />

      </UserContextProvider>
    </ThemeContextProvider>
  );
}

const ViewHandler = () => {
  const { user } = useContext(UserContext)

  return (
    <>
      {user
        ? <NoteGallery />
        : <AuthPage />
      }
    </>
  )
}

export default App