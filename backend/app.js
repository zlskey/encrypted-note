const express = require('express')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const compression = require(`compression`)
const logger = require('morgan')
const dotenv = require('dotenv')
const path = require('path')

dotenv.config()

const PORT = process.env.PORT || 5000
const dbURI = process.env.DATABASE_URL
const origin = process.env.CORS_ORIGIN
const NODE_ENV = process.env.NODE_ENV

const router = require('./routers/router')

app = express()

if (NODE_ENV === 'development') app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(compression())
app.use(cookieParser())
app.use(cors({ origin, credentials: true }))
app.listen(PORT, () => console.log(`listening on ${PORT}`))
console.log(`Running in ${NODE_ENV} enviroment`)



mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);

mongoose
    .connect(dbURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log(`db connected`))
    .catch((err) => console.log(err));

app.use('/api', router)
app.use((error, req, res, next) => res.status(error.status || 500).json(error.message))

if (NODE_ENV === 'production') {
    const buildPath = path.join(__dirname, '..', 'frontend-dir', 'build')

    app.use(express.static(buildPath))
    app.get('/', (req, res) => res.sendFile(path.join(buildPath, 'index.html')))
}