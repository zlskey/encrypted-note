import {
    UPDATE_USER_NOTES,
    CHANGE_USER_NOTE,
    REMOVE_USER_NOTE,
    ADD_USER_NOTE,
    UPDATE_SHARED_NOTES,
    CHANGE_SHARED_NOTE,
    REMOVE_SHARED_NOTE,
    ADD_SHARED_NOTE,
} from '@redux/types'

const initialState = {
    user: [],
    shared: [],
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_USER_NOTES:
            return { shared: state.shared, user: action.notes }
        case CHANGE_USER_NOTE:
            return {
                shared: state.shared,
                user: state.user.map(note => {
                    if (note._id === action.note._id)
                        note.content = action.note.content
                    return note
                }),
            }
        case ADD_USER_NOTE:
            return { shared: state.shared, user: [...state.user, action.note] }
        case REMOVE_USER_NOTE:
            return {
                shared: state.shared,
                user: state.user.filter(note => note._id !== action.note._id),
            }

        // ======================

        case UPDATE_SHARED_NOTES:
            return { ...state, shared: action.notes }
        case CHANGE_SHARED_NOTE:
            return {
                user: state.user,
                shared: state.shared.map(note => {
                    if (note._id === action.note._id)
                        note.content = action.note.content
                    return note
                }),
            }
        case ADD_SHARED_NOTE:
            return { user: state.user, shared: [...state.shared, action.note] }
        case REMOVE_SHARED_NOTE:
            return {
                user: state.user,
                shared: state.shared.filter(
                    note => note._id !== action.note._id
                ),
            }
        default:
            return state
    }
}

export default reducer
