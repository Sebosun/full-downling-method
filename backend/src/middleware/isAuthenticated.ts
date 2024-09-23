import { JWTUser } from '@/types/request';
import type { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET

if (!JWT_SECRET) {
  throw new Error("JWT Secret not set")
}

export async function isAuthenticatedMiddleware(req: Request, res: Response, next: NextFunction): Promise<void> {
  if (!JWT_SECRET) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Internal server error');
    return
  }

  const auth = req.headers.authorization?.split(' ');
  const bearer = auth?.[0]
  const token = auth?.[1]

  if (!token || !(bearer === 'Bearer')) {
    res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Authentication required.' });
    return;
  }

  try {
    const jwtData = jwt.verify(token, JWT_SECRET) as JWTUser
    res.locals.jwtUser = jwtData
    next()
  } catch (e) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Internal server error');
    return
  }
}
