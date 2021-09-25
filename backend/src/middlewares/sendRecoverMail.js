const messageSheet =
    '<body><code>If you have not requested a password reset, please skip this message.</code><br /><code>However, if you want to change your password, </code><a href="#link">click here</a><br /></body>'
const fetch = (...args) =>
    import('node-fetch').then(({ default: fetch }) => fetch(...args))

module.exports = async (mail, id) => {
    const content = messageSheet.replace(
        '#link',
        `${process.env.CORS_ORIGIN}/password-recovery?id=${id}`
    )

    const body = JSON.stringify({
        API_KEY: process.env.SENDER_API_KEY,
        receiver: mail,
        subject: 'Password recovery',
        content: content,
    })

    const res = await fetch(process.env.SENDER_API_LINK, {
        method: 'POST',
        body,
        headers: { 'Content-Type': 'application/json' },
    })

    return res.ok
}
