import { encryptPassword } from "@/helpers/encryptPassword";
import { createUser, findUser } from "@/repositories/PersonRepository";
import type { Request, Response } from 'express';
import { StatusCodes } from "http-status-codes";

export async function create(req: Request, res: Response) {
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

  const username = body.username
  try {

    const hasUser = await findUser(username)

    if (hasUser) {
      res.status(StatusCodes.UNAUTHORIZED)
      res.json({ message: "User with this name already exists" })
      return
    }

    const hashedPasswd = await encryptPassword(body.password)
    const usr = await createUser({
      username: body.username,
      password: hashedPasswd,
    })

    res.status(StatusCodes.OK)
    res.json(usr)
  } catch (e) {
    console.error(e)
    res.status(StatusCodes.INTERNAL_SERVER_ERROR)
    res.json({ message: "Failure to create passwd" })
  }
}

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
  try {
    const usr = await findUser(username.toLowerCase())
    if (!usr) {
      res.status(StatusCodes.NOT_FOUND)
      res.json({ message: "User not found" })
      return
    }
    res.status(200)
    res.json(usr)
  } catch (e) {
    console.error(e)
    res.status(StatusCodes.INTERNAL_SERVER_ERROR)
    res.json({ message: "Failure to create passwd" })
  }
}
