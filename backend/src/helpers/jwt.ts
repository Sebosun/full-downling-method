import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET

// Should crash app 
// but thats on you since 
// you are not setting any envs, dummy
if (!JWT_SECRET) {
  throw new Error("JWT Secret not set")
}

export function signJWT(user_id: number): string {
  if (!JWT_SECRET) throw new Error("JWT Secret not set")
  return jwt.sign({ userId: user_id }, JWT_SECRET, {
    expiresIn: '1h',
  });
}

