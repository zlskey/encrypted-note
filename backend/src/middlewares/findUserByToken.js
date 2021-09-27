const jwt = require('jsonwebtoken')
const User = require('../schemas/UserSchema')

module.exports = async req => {
    const token = req.cookies.jwt

    if (token) {
        const id = jwt.verify(token, process.env.JWT_SECRET).id
        // const id = '614b82d8a7028334b8ca857a'

        try {
            const data = await User.findById(id)

            if (!data) throw 'session expired EXERR'
            else return data
        } catch (err) {
            throw Error(err)
        }
    } else return null
}
