const nodemailer = require('nodemailer')
const SMTP_PORT = process.env.SMTP_PORT || 587

const sendMail = async (receiver, subject, content) => {
	try {
		const transporter = nodemailer.createTransport({
			host: process.env.SMTP_SERVER,
			port: SMTP_PORT,
			secure: SMTP_PORT === 465,
			auth: {
				user: process.env.SENDER_MAIL,
				pass: process.env.SENDER_PASSWORD,
			},
		})

		const info = await transporter.sendMail({
			from: process.env.SENDER_MAIL,
			to: receiver,
			subject: subject,
			html: content,
		})

		if (info.accepted.includes(receiver)) return true
		else return false
	} catch (err) {
		throw Error(err)
	}
}

module.exports.sendPasswordRecoveryMail = async (mail, id) => {
	const href = `${process.env.CORS_ORIGIN}/password-recovery?id=${id}`
	const message = `<body><code>If you have not requested a password reset, please skip this message.</code><br /><code>However, if you want to change your password, </code><a href="${href}">click here</a><br /></body>`

	try {
		const result = await sendMail(mail, 'Password recovery', message)
		if (result) return 'success'
		else throw Error('something went wrong')
	} catch (err) {
		throw Error('something went wrong')
	}
}
