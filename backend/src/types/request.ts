import type { Request } from 'express';

export type ContextType = {
  auth: AuthType
}

type AuthType = {
  userId: number
  iat: number
  exp: number
}
