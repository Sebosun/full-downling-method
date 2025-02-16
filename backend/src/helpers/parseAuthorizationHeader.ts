import { JWTUser } from '@/../types/locals';
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET

if (!JWT_SECRET) {
    throw new Error("JWT Secret not set")
}

/**
 * Parses the Authorization header and returns the JWT user
 * @param auth - Authorization header
 * @returns JWTUser | null
 */
export const parseAuthorizationHeader = (auth: string | undefined): null | JWTUser => {
    if (!auth) {
        return null
    }
    const [bearer, token] = auth.split(' ')
    if (bearer !== 'Bearer' || !token) {
        return null
    }
    const jwtData = jwt.verify(token, JWT_SECRET) as JWTUser
    return jwtData
}

