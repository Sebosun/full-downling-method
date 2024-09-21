import { comparePasswds } from "@/helpers/encryptPassword";
import { findUser } from "@/repositories/PersonRepository";
import type { Request, Response } from 'express';
import { StatusCodes } from "http-status-codes";

export async function login(req: Request, res: Response) {
  const body = req.body;

  console.log(body)
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
    const usr = await findUser(username.toLowerCase())
    if (!usr) {
      res.status(StatusCodes.NOT_FOUND)
      res.json({ message: "User not found" })
      return
    }

    const hasPassword = await comparePasswds(password, usr.password)
    if (!hasPassword) {
      res.status(StatusCodes.UNAUTHORIZED)
      res.json({ message: "Wrong password" })
      return
    }

    res.status(200)
    res.json(usr)
  } catch (e) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR)
    res.json({ message: "Failure to create passwd" })
  }
}
