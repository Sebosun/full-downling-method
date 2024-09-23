import { encryptPassword } from "@/helpers/encryptPassword";
import { createUser, findUser, findAllUsers, findUserById } from "@/repositories/UserRepository";
import type { Request, Response } from 'express';
import { StatusCodes } from "http-status-codes";


export async function create(req: Request, res: Response): Promise<void> {
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
    res.json({ message: "Failure to verify user" })
  }
}

export async function getAllUsers(_: Request, res: Response): Promise<void> {
  try {
    const users = await findAllUsers()
    res.status(StatusCodes.OK)
    res.json(users)
  } catch (e) {
    console.error(e)
    res.status(StatusCodes.INTERNAL_SERVER_ERROR)
    res.json({ message: "Failed to get all users" })
  }
}

export async function getCurrentUser(_: Request, res: Response): Promise<void> {
  const userId = res.locals.jwtUser?.userId

  if (!userId) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: "Missing user id" })
    return
  }

  try {
    const user = await findUserById(userId)
    res.status(StatusCodes.OK)
    res.json(user)
  } catch (e) {
    console.error(e)
    res.status(StatusCodes.BAD_REQUEST)
    res.json({ message: "User with given id doesnt exist" })
  }
}
