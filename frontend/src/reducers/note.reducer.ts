import INote from 'src/types/INote'
import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

type State = INote[]

const initialState: State = []

const noteSlice = createSlice({
    name: 'note',
    initialState,
    reducers: {
        setNotes: (state, action: PayloadAction<INote[]>) => [
            ...action.payload,
        ],
        removeNote: (state, action: PayloadAction<INote['_id']>) => {
            return state.filter(note => note._id !== action.payload)
        },
        createNote: (state, action: PayloadAction<INote>) => {
            return [...state, action.payload]
        },
        updateOneNote: (state, action: PayloadAction<INote>) => {
            if (state.includes(action.payload) === false) {
                return [action.payload]
            }

            return state.map(el => {
                if (el._id === action.payload._id) return action.payload

                return el
            })
        },
    },
})

export const selectNote = (noteId: string) => (state: { notes: INote[] }) => {
    return state.notes.find(note => note._id === noteId)!
}
export const selectNotes = (state: { notes: INote[] }) => state.notes

export const { setNotes, removeNote, createNote, updateOneNote } =
    noteSlice.actions
export default noteSlice.reducer
