import mongoose from 'mongoose'

export interface IKey {
    _id: mongoose.Types.ObjectId

    username: string
    privateKey: string
    publicKey: string
}

const keySchema = new mongoose.Schema({
    ownerId: {
        type: String,
        unique: true,
        required: true,
    },
    privateKey: {
        type: String,
        required: true,
    },
    publicKey: {
        type: String,
        required: true,
    },
})

const Key = mongoose.model('Keys', keySchema)

export default Key
