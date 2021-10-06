const mongoose = require('mongoose')
const moment = require('moment')

const passwordRecoverySchema = new mongoose.Schema({
    mail: {
        type: String,
        required: true,
        unique: true,
    },
    expireAt: {
        type: Date,
    },
})

passwordRecoverySchema.index({ expireAt: 1 }, { expireAfterSeconds: 0 })
passwordRecoverySchema.pre('save', function (next) {
    this.expireAt = moment().add(5, `minutes`).toDate()
    next()
})

const PasswordRecovery = mongoose.model(
    'Password recovery',
    passwordRecoverySchema
)

module.exports = PasswordRecovery
