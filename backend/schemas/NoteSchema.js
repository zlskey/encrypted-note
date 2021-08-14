const mongoose = require('mongoose')

const noteSchema = new mongoose.Schema({
    author: {
        type: String,
        require: true,
    },
    recipients: {
        type: Array,
        require: true,
    },
    content: {
        type: String,
        require: true,
    }
}, { timestamps: true })

const Note = mongoose.model('Notes', noteSchema)

module.exports = Note