import { encryptPassword } from "@/helpers/encryptPassword";
import { createUser, findUser, findAllUsers, findUserById } from "@/repositories/UserRepository";
import type { Request, Response } from 'express';
import { StatusCodes } from "http-status-codes";
import { SelectedExercisesSchema } from '@/schemas/UserSettingsSchema'
import z from "zod";
import { SelectedExercises } from "@/types";
import { upsertSelectedExercises } from "@/repositories/SelectedExercisesRepository";

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

export async function updateUserSettings(req: Request, res: Response): Promise<void> {
  const userId = res.locals.jwtUser?.userId
  if (!userId) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Something went wrong" })
    return
  }

  try {
    const upsertPayload = [] as SelectedExercises[]
    const { exercises } = SelectedExercisesSchema.parse(req.body)

    exercises.forEach(exercise => {
      upsertPayload.push({
        selected: exercise.selected,
        user_id: userId,
        exercise_id: exercise.exercise_id
      })
    })

    const upsertedExercises = await upsertSelectedExercises(upsertPayload)
    res.status(StatusCodes.OK)
    res.json(upsertedExercises)
  } catch (e) {
    if (e instanceof z.ZodError) {
      console.log(e.issues);
      res.status(StatusCodes.BAD_REQUEST)
      res.json({ message: "Payload has missing properties" })
      return
    }
    console.log(e);
    res.json({ message: "Something went wrong" })
  }

}
