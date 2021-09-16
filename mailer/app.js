const nodemailer = require('nodemailer')
const express = require('express')
const dotenv = require('dotenv')
dotenv.config()

const SMTP_PORT = process.env.SMTP_PORT || 587
const PORT = process.env.PORT || 4000

app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.listen(PORT, () => console.log('listening on ', PORT))

app.use((req, res, next) => {
    if (req.body.API_KEY !== process.env.API_KEY) res.status(401).json({ error: 'invalid api key' })
    else next()
})

app.post('/', async (req, res, next) => {
    try {
        const { receiver, subject, content } = req.body

        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_SERVER,
            port: SMTP_PORT,
            secure: SMTP_PORT === 465,
            auth: {
                user: process.env.SENDER_MAIL,
                pass: process.env.SENDER_PASSWORD,
            },
        });

        const info = await transporter.sendMail({
            from: process.env.SENDER_MAIL,
            to: receiver,
            subject: subject,
            html: content,
        });

        if (info.accepted.includes(receiver)) res.status(202).json('success')
        else res.status(500).json({ error: 'something went wrong' })
    }

    catch (err) {
        next(err)
    }
})

app.use((err, req, res, next) => {
    res.status(400).json({ error: err.message })
})