import type { Request, Response, NextFunction } from 'express'

/**
 * Error handling middleware
 * Catches and formats errors consistently
 */
export const errorHandler = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const status = err.status || 500
    const message = err.message || 'Internal Server Error'

    console.error(`[${status}] ${message}`, err)

    res.status(status).json({
        error: {
            status,
            message,
            ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
        },
    })
}

/**
 * Logger middleware
 * Logs incoming requests
 */
export const logger = (req: Request, res: Response, next: NextFunction) => {
    const start = Date.now()

    res.on('finish', () => {
        const duration = Date.now() - start
        console.log(
            `${req.method} ${req.path} - ${res.statusCode} (${duration}ms)`
        )
    })

    next()
}

/**
 * Custom authentication middleware example
 */
export const authenticate = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.replace('Bearer ', '')

    if (!token) {
        return res.status(401).json({ error: 'Missing authorization token' })
    }

    // Verify token logic here
    // For now, just pass through
    console.log('Token verified:', token)

    next()
}

/**
 * Request validation middleware
 */
export const validateRequest = (schema: any) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const { error, value } = schema.validate(req.body)

        if (error) {
            return res.status(400).json({
                error: 'Validation failed',
                details: error.details
            })
        }

        req.body = value
        next()
    }
}
