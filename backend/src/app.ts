import './utils/system.utils'

import cookieParser from 'cookie-parser'
import cors from 'cors'
import { errorMiddleware } from './middlewares'
import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import router from './routers'

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(morgan('dev'))
app.use(helmet())
app.use(
    cors({
        credentials: true,
        origin: process.env.CORS_ORIGIN,
    })
)

app.use(router)
app.use(errorMiddleware.notFound)
app.use(errorMiddleware.errorHandler)

const PORT = process.env.PORT || 80
app.listen(PORT, () => console.info('Listening on: http://localhost:%d', PORT))
