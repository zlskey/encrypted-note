import { combineReducers } from 'redux'
import userReducer from './userReducer'
import notesReducer from './notesReducer'
import focusedNoteReducer from './focusedNoteReducer'

export default combineReducers({
    user: userReducer,
    notes: notesReducer,
    focusedNote: focusedNoteReducer,
})
