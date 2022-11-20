import { ErrorRequestHandler, RequestHandler } from 'express'

export const notFound: RequestHandler = (req, res, next) => {
    const error = new ErrorObject(
        `Invalid route - ${req.method} ${req.originalUrl}`,
        404
    )

    next(error)
}

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    const statusCode = err.code || 500

    if (err instanceof ErrorObject === false) {
        console.error(err)
    }

    res.status(statusCode).json({
        error: {
            code: err.code,
            message: err.message,
            stack: process.env.NODE_ENV === 'production' ? '⛷️' : err.stack,
        },
    })
}

export function ErrorObject(
    this: { message: string; code: number },
    message: string,
    code: number = 400
) {
    this.message = message
    this.code = code
}
