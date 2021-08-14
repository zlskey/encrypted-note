const Key = require('../schemas/KeySchema')
const openpgp = require('openpgp')
const Note = require('../schemas/NoteSchema')

const readPrivateKey = async (username, pin) => {
    try {
        const { privateKey: armoredKey } = await Key.findOne({ username })

        const privateKey = await openpgp.readPrivateKey({ armoredKey })

        const decryptionKeys = await openpgp.decryptKey({
            privateKey,
            passphrase: pin
        })

        return decryptionKeys
    }
    catch (err) { throw Error(err) }
}

const decryptNotes = async (encryptedNotes, username, pin) => {
    try {
        const decryptionKeys = await readPrivateKey(username, pin)

        const decryptedNotes = await Promise.all(
            encryptedNotes.map(async note => {
                const message = await openpgp.readMessage({
                    armoredMessage: note.content,
                });

                const content = await openpgp.decrypt({
                    message,
                    decryptionKeys
                })

                note.content = content.data
                return note
            })
        )
        return decryptedNotes
    }
    catch (err) { throw Error(err) }
}

const encryptNotes = async (notes, username) => {
    try {

        await Promise.all(
            notes.map(async (note) => {
                const content = await encrypt(note.content, username)
                await Note.findByIdAndUpdate(note._id, { content })
            })
        )

        return true
    }
    catch (err) { throw Error(err) }
}

const encrypt = async (content, ...usernames) => {
    try {
        const encryptionKeys = await Promise.all(
            usernames.map(async (username) => {
                const keys = await Key.findOne({ username });
                const armoredKey = keys.publicKey
                const encryptionKey = await openpgp.readKey({ armoredKey })
                return encryptionKey
            })
        )
        const message = await openpgp.createMessage({ text: content })

        const encryptedContent = await openpgp.encrypt({ message, encryptionKeys })

        return encryptedContent
    }
    catch (err) { throw Error(err) }
}

const generateKeys = async (name, passphrase) => {
    try {
        const { publicKey, privateKey } = await openpgp.generateKey({
            type: 'rsa',
            rsaBits: 4096,
            userIDs: [{ name }],
            passphrase
        })

        await Key.create({ privateKey, publicKey, username: name })

        return true
    }
    catch (err) { throw Error(err) }
}

module.exports = { decryptNotes, encryptNotes, encrypt, generateKeys, readPrivateKey }