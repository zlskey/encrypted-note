import IUser from './IUser'

export default interface INote {
    _id: string

    authorId: IUser['_id']
    recipients: IUser['_id'][]
    updatedAt: string
    title: string // @todo
    content: string
}
