import {
    SHOW_FOCUSED_NOTE,
    HIDE_FOCUSED_NOTE,
    UPDATE_FOCUSED_NOTE,
} from '@redux/types'

const initialState = { data: null }

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SHOW_FOCUSED_NOTE:
            return { data: action.note }
        case HIDE_FOCUSED_NOTE:
            return { data: null }
        case UPDATE_FOCUSED_NOTE:
            return { data: { ...state.data, ...action.data } }
        default:
            return state
    }
}

export default reducer
