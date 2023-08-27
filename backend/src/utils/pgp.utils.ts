import * as openpgp from 'openpgp'

export const generateKeys = async (
    username: string,
    passphrase: string
): Promise<openpgp.SerializedKeyPair<string>> => {
    const keyChain = await openpgp.generateKey({
        type: 'rsa',
        rsaBits: 4096,
        userIDs: [{ name: username }],
        passphrase,
    })

    return keyChain
}

export const readPrivateKey = async (
    armoredKey: string,
    passphrase: string
) => {
    const privateKey = await openpgp.readPrivateKey({ armoredKey })

    const decryptionKeys = await openpgp.decryptKey({
        privateKey,
        passphrase,
    })

    return decryptionKeys
}

export const validatePassphrase = async (
    armoredKey: string,
    passphrase: string
) => {
    try {
        await openpgp.decryptKey({
            privateKey: await openpgp.readPrivateKey({ armoredKey }),
            passphrase,
        })

        return true
    } catch (err) {
        return false
    }
}

export const readPublicKey = async (publicKey: string) => {
    return await openpgp.readKey({ armoredKey: publicKey })
}

export const encrypt = async (content, encryptionKeys: openpgp.Key[]) => {
    if (await isEncrypted(content)) {
        return content
    }

    const message = await openpgp.createMessage({ text: content })

    const encryptedContent = await openpgp.encrypt({
        message,
        encryptionKeys,
    })

    return encryptedContent.toString()
}

export const decrypt = async (
    encryptedContent: string,
    decryptionKeys: openpgp.PrivateKey
) => {
    try {
        const message = await openpgp.readMessage({
            armoredMessage: encryptedContent,
        })
        const content = await openpgp.decrypt({
            message,
            decryptionKeys,
        })

        return content.data.toString()
    } catch (err) {
        return encryptedContent
    }
}

export const isEncrypted = async (content: string) => {
    try {
        await openpgp.readMessage({
            armoredMessage: content,
        })
        return true
    } catch (err) {
        return false
    }
}

export default decrypt
