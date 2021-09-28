import { UPDATE_USER, LOGOUT_USER } from '@redux/types'

const initialState = null

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_USER:
            const output = state
                ? { ...state, ...action.data }
                : { ...action.data }

            return output
        case LOGOUT_USER:
            return null
        default:
            return state
    }
}

export default reducer
