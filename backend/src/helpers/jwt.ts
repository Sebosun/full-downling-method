import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET

if (!JWT_SECRET) {
  throw new Error("JWT Secret not set")
}

export function signJWT(user_id: number): string {
  return jwt.sign({ userId: user_id }, JWT_SECRET, {
    expiresIn: '1h',
  });
}

