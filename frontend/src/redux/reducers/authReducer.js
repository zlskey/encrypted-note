import { UPDATE_USER } from '@redux/types'

const initialState = { user: null }

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_USER:
            return { ...state, ...action.data }
        default:
            return state
    }
}

export default reducer
