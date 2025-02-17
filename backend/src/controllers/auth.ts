import { comparePasswds } from "@/helpers/encryptPassword";
import { findUser } from "@/repositories/UserRepository";
import { UserCreateSchema } from "@/schemas/UserSchema";
import type { Request, Response } from 'express';
import { StatusCodes } from "http-status-codes";
import { signJWT } from "@/helpers/jwt";

export async function login(req: Request, res: Response) {
  const body = req.body;

  const result = UserCreateSchema.safeParse(body)

  if (!result.success) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: "Invalid payload", errors: result.error })
    return
  }

  const { username, password } = result.data
  try {
    const user = await findUser(username.toLowerCase())
    if (!user) {
      res.status(StatusCodes.NOT_FOUND)
      res.json({ message: "User not found" })
      return
    }

    const isPasswdSame = await comparePasswds(password, user.password)
    if (!isPasswdSame) {
      res.status(StatusCodes.UNAUTHORIZED)
      res.json({ message: "Authorization failed" })
      return
    }

    const token = signJWT(user.id)

    res.status(200)
    res.json({ token })
  } catch (e) {
    console.error("Error while logging in", e)
    res.status(StatusCodes.INTERNAL_SERVER_ERROR)
    res.json({ message: "Something went wrong" })
  }
}
