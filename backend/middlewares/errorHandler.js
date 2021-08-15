const path = require('path')

const errorHandler = (err, next) => {
    const error = new Error()
    error.status = 403

    const contain = text => err.message.includes(text)

    if (contain('Incorrect key passphrase')) error.message = 'Wrong PIN'
    else if (contain('incorrect password')) error.message = 'Wrong password'
    else if (contain('incorrect username')) error.message = 'User with these username doesn`t exists'
    else if (contain('duplicate key error')) error.message = 'User already exists'
    // else if (contain('short password')) error.message = `Password is too short`
    else if (contain('long password')) error.message = `Password is too long`
    else if (contain('EXERR')) error.message = err.message.replace(' EXERR', '') // EXERR is Expected Error
    else {
        error.message = 'Something went wrong'
        error.code = 500
        console.log(err.message)
    }

    next(error)
}

module.exports = errorHandler