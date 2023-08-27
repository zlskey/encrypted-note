import {
    createNote,
    removeNote,
    setNotes,
    updateOneNote,
} from 'src/reducers/note.reducer'

import { Dispatch } from 'redux'
import HttpService from './http.service'
import INote from 'src/types/INote'

export default class NoteService {
    constructor(private dispatch: Dispatch, private httpService: HttpService) {}

    async getOne(
        id: INote['_id'],
        passphrase: string = ''
    ): Promise<INote | null> {
        const res = await this.httpService.get('note', { id, passphrase })

        if (!res) {
            return null
        }

        this.dispatch(updateOneNote(res.data))

        return res.data
    }

    async getAll(passphrase: string = ''): Promise<INote[]> {
        const res = await this.httpService.get('note', { passphrase })

        this.dispatch(setNotes(res.data))

        return res.data
    }

    async create(title: string, content: string): Promise<INote> {
        const res = await this.httpService.post('note', { title, content })

        this.dispatch(createNote(res.data))

        return res.data
    }

    async update(
        noteId: string,
        title: string,
        content: string
    ): Promise<INote> {
        const res = await this.httpService.patch('note', {
            noteId,
            title,
            content,
        })

        this.dispatch(updateOneNote(res.data))

        return res.data
    }

    async share(note: INote, username: string): Promise<void> {
        const res = await this.httpService.patch('note/share', {
            noteId: note._id,
            content: note.content,
            username,
        })

        this.dispatch(updateOneNote(res.data))
    }

    async unshare(note: INote, username: string): Promise<void> {
        const res = await this.httpService.patch('note/unshare', {
            noteId: note._id,
            content: note.content,
            username,
        })

        this.dispatch(updateOneNote(res.data))
    }

    async getRecipients(note: INote): Promise<string[]> {
        const res = await this.httpService.get('note/recipients', {
            noteId: note._id,
        })

        return res.data
    }

    async delete(note: INote) {
        await this.httpService.delete('note', { _id: note._id })

        this.dispatch(removeNote(note._id))
    }
}
