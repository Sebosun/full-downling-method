import { encryptPassword } from "@/helpers/encryptPassword";
import { createUser } from "@/repositories/PersonRepository";
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

  try {
    const hashedPasswd = await encryptPassword(body.password)
    const usr = await createUser({
      username: 'test',
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
