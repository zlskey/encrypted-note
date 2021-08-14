const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minLength: [8, 'short password'],
        maxLength: [32, 'long password'],
    },
    theme: {
        type: String,
        default: 'light'
    },
    encryption: {
        type: Boolean,
        default: false
    },
})

userSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt()
    this.password = await bcrypt.hash(this.password, salt)

    next()
})

userSchema.statics.changePassword = async function (password, _id) {
    try {
        const salt = await bcrypt.genSalt()
        password = await bcrypt.hash(password, salt)

        const user = await User.findByIdAndUpdate(_id, { password })
        return user
    }
    catch (err) {
        throw Error(err)
    }
}

userSchema.statics.login = async function (username, password) {
    const user = await this.findOne({ username })

    if (user) {
        const auth = await bcrypt.compare(password, user.password)
        if (auth) return user
        throw Error('incorrect password')
    }
    throw Error('incorrect username')
}


const User = mongoose.model('Users', userSchema)

module.exports = User