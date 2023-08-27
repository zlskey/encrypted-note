import dotenv from 'dotenv'
import mongoose from 'mongoose'

/**
 * it inits db and env files
 */

dotenv.config()

const dbURI = process.env.MONGODB_URL

if (!dbURI) throw Error('MONGODB_URL is not defined')

mongoose
    .connect(dbURI)
    .then(() => console.info('db connected'))
    .catch(err => console.error(err))

export default {}
