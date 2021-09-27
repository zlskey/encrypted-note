const findUserByToken = require('./findUserByToken')

module.exports = async (req, res, next) => {
    try {
        const user = await findUserByToken(req)
        if (user) {
            req.user = user
            next()
        } else throw Error("You're not logged in EXERR") // user is trying to do something while he is not logged in
    } catch (err) {
        next(err)
    }
}
