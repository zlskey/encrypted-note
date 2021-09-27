import { combineReducers } from 'redux'
import authReducer from './authReducer'
import notesReducer from './notesReducer'
import focusedNoteReducer from './focusedNoteReducer'

export default combineReducers({
    auth: authReducer,
    notes: notesReducer,
    focusedNote: focusedNoteReducer,
})
