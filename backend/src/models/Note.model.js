const mongoose = require('mongoose')

const noteSchema = new mongoose.Schema(
    {
        author: {
            type: String,
            required: true,
        },
        recipients: {
            type: Array,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
)

const Note = mongoose.model('Notes', noteSchema)

module.exports = Note
