const errorHandler = require('./errorHandler')
const findUserByToken = require('./findUserByToken')

module.exports = async (req, res, next) => {
    try {
        const user = await findUserByToken(req)
        if (user) {
            req.user = user
            next()
        }
        else res.status(403).json(null) // user is trying to do something while he is not logged in
    }
    catch (err) {
        errorHandler(err, next)
    }
}