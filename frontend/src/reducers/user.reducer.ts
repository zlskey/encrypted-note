import { Action } from '@remix-run/router'
import IUser from 'src/types/IUser'
import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

interface data {
    [key: string]: any
}

const userSlice = createSlice({
    name: 'user',
    initialState: {},
    reducers: {
        signUp(state, action: PayloadAction<data>) {
            return { ...state, ...action.payload }
        },
        logout() {
            return { ...{} }
        },
        setUserData(state, action: PayloadAction<data>) {
            return { ...action.payload }
        },
        enableEncryption(state) {
            return { ...state, encryption: true }
        },
    },
})

export const selectUser = (state: { user: IUser }) => state.user
export const { signUp, setUserData, logout, enableEncryption } =
    userSlice.actions
export default userSlice.reducer
