const fs = require('fs')
const path = require('path')

class Log {

    constructor(error) {
        this.message = error
    }

    write() {
        const errorsStorage = path.join(__dirname, '..', 'error_log.json')
        const time = new Date()

        const data = {
            time,
            message: this.message
        }

        const fileData = fs.readFileSync(errorsStorage, { encoding: 'utf8', flag: 'r' })
        const formatedData = JSON.parse(fileData)
        formatedData.errors.push(data)
        const output = JSON.stringify(formatedData)

        fs.writeFileSync(errorsStorage, output)
    }

}

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
        new Log(err.message).write()
    }

    next(error)
}

module.exports = errorHandler