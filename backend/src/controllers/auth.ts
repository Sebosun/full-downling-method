import { comparePasswds } from "@/helpers/encryptPassword";
import { findUser } from "@/repositories/UserRepository";
import type { Request, Response } from 'express';
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET

if (!JWT_SECRET) {
  throw new Error("JWT Secret not set")
}

export async function login(req: Request, res: Response) {
  if (!JWT_SECRET) return
  const body = req.body;

  if (!body) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: "Missing username" })
    return
  }
  if (!body?.username) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: "Missing username" })
    return
  }

  if (!body?.password) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: "Missing username" })
    return
  }
  // Do fancy stuff with password that I cba atm 
  // ZOD? 
  //
  const username = body.username as string
  const password = body.password as string
  try {
    const user = await findUser(username.toLowerCase())
    if (!user) {
      res.status(StatusCodes.NOT_FOUND)
      res.json({ message: "User not found" })
      return
    }

    const hasPassword = await comparePasswds(password, user.password)
    if (!hasPassword) {
      res.status(StatusCodes.UNAUTHORIZED)
      res.json({ message: "Authorization failed" })
      return
    }
    const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
      expiresIn: '1h',
    });

    res.status(200)
    res.json({ token })
  } catch (e) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR)
    res.json({ message: "Failure to create passwd" })
  }
}
