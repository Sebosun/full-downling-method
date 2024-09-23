export type JWTUser = {
  userId: number
  iat: number
  exp: number
}

declare global {
  namespace Express {
    interface Locals {
      jwtUser?: JWTUser
    }
  }
}
