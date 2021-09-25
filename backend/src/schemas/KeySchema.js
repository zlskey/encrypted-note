const mongoose = require('mongoose')

const keySchema = new mongoose.Schema({
	username: {
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

module.exports = Key
