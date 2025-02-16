import type { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { parseAuthorizationHeader } from '@/helpers/parseAuthorizationHeader';

const JWT_SECRET = process.env.JWT_SECRET

/**
 * Checks if user is authenticated
 * @param req - Request object
 * @param res - Response object
 * @param next - Next function
 * @returns void
 */
export async function isAuthenticatedMiddleware(req: Request, res: Response, next: NextFunction): Promise<void> {
    if (!JWT_SECRET) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Internal server error');
        return
    }

    try {
        const jwtUser = parseAuthorizationHeader(req.headers.authorization)
        if (!jwtUser) {
            res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Authentication required.' });
            return;
        }
        res.locals.jwtUser = jwtUser
        next()
    } catch {
        res.status(StatusCodes.UNAUTHORIZED).send('Token is invalid or expired');
        return
    }
}

/**
 * Middleware only checks if the user is authenticated, 
 * but does not throw an error if the user is not authenticated. 
 * @param req - Request object
 * @param res - Response object
 * @param next - Next function
 * @returns void
 */
export async function mayBeAuthenticatedMiddleware(req: Request, res: Response, next: NextFunction): Promise<void> {
    const jwtUser = parseAuthorizationHeader(req.headers.authorization)
    if (jwtUser) {
        res.locals.jwtUser = jwtUser
    }
    next()
}
