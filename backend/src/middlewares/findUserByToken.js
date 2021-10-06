const jwt = require('jsonwebtoken')
const User = require('../models/User.model')

module.exports = async req => {
    const token = req.cookies.jwt

    if (token) {
        const id = jwt.verify(token, process.env.JWT_SECRET).id

        try {
            const data = await User.findById(id)

            if (!data) throw 'session expired EXERR'
            else return data
        } catch (err) {
            throw Error(err)
        }
    } else return null
}
