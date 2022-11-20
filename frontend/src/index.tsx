import './index.css'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

import App from './App'
import { Provider } from 'react-redux'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { configureStore } from '@reduxjs/toolkit'
import noteReducer from 'src/reducers/note.reducer'
import userReducer from 'src/reducers/user.reducer'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

const store = configureStore({
    reducer: {
        user: userReducer,
        notes: noteReducer,
    },
})

root.render(
    <Provider store={store}>
        <React.StrictMode>
            <App />
        </React.StrictMode>
    </Provider>
)
