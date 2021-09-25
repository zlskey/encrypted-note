const Note = require('../schemas/NoteSchema')
const User = require('../schemas/UserSchema')
const pgpHandler = require('../middlewares/pgpHandler')
const errorHandler = require('../middlewares/errorHandler')
const checkRequirements = require('../middlewares/checkRequirements')

module.exports.create = async (req, res, next) => {
	try {
		const { username, encryption } = req.user
		const content = req.body.content

		checkRequirements(content)

		const output = encryption
			? await pgpHandler.encrypt(content, username)
			: content

		const note = await Note.create({ author: username, content: output })
		note.content = content

		res.status(201).json(note)
	} catch (err) {
		errorHandler(err, next)
	}
}

module.exports.edit = async (req, res, next) => {
	try {
		const { username, encryption } = req.user
		const { id, content } = req.body

		checkRequirements(id, content)

		const output = encryption
			? await pgpHandler.encrypt(content, username)
			: content

		const note = await Note.findOneAndUpdate(
			{ _id: id, author: username },
			{ content: output }
		)

		res.status(201).json(true)
	} catch (err) {
		errorHandler(err, next)
	}
}

module.exports.remove = async (req, res, next) => {
	const _id = req.body.id
	const { username } = req.user

	try {
		checkRequirements(_id)
		await Note.findOneAndRemove({ author: username, _id })

		res.status(201).json(true)
	} catch (err) {
		errorHandler(err, next)
	}
}

module.exports.share = async (req, res, next) => {
	const { id, recipient, content } = req.body
	const { username, encryption } = req.user

	try {
		checkRequirements(id, recipient, content)

		const note = await Note.findById(id)
		const { author, recipients } = note

		if (username !== note.author) throw Error(`You're not the author EXERR`)
		if (username === recipient)
			throw Error(`You can't be recipient of your note EXERR`)
		if (recipients.includes(recipient))
			throw Error(`${recipient} is already recipient of this note EXERR`)
		if (!encryption) throw Error('Turn encryption to do this EXERR')

		const recipientData = await User.findOne({ username: recipient })
		if (!recipientData)
			throw Error(`User ${recipient} doesn't exists EXERR`)
		else if (!recipientData.encryption)
			throw Error(`User ${recipient} don't have encryption active EXERR`)

		const usernames = [...recipients, author, recipient]
		const encryptedContent = await pgpHandler.encrypt(content, ...usernames)

		await Note.findByIdAndUpdate(id, {
			recipients: [...recipients, recipient],
			content: encryptedContent,
		})

		res.status(201).json([...recipients, recipient])
	} catch (err) {
		errorHandler(err, next)
	}
}

module.exports.unlink = async (req, res, next) => {
	const { id, content } = req.body
	const { username } = req.user

	try {
		checkRequirements(id, content)

		const note = await Note.findById(id)
		const isAuthor = note.author === username

		if (isAuthor) checkRequirements(req.body.recipientToUnlink)
		const recipientToUnlink = isAuthor
			? req.body.recipientToUnlink
			: username

		const recipients = note.recipients.filter(
			user => user !== recipientToUnlink
		)
		const encryptedContent = await pgpHandler.encrypt(
			content,
			note.author,
			...recipients
		)

		await Note.findByIdAndUpdate(id, {
			recipients,
			content: encryptedContent,
		})

		const output = isAuthor ? recipients : true
		res.status(201).json(output)
	} catch (err) {
		errorHandler(err, next)
	}
}
