import { StatusCodes } from "http-status-codes"
import { SelectedExercisesSchema } from '@/schemas/UserSettingsSchema'
import { SelectedExercises } from "@/types";
import { upsertSelectedExercises } from "@/repositories/SelectedExercisesRepository";
import type { Request, Response } from 'express';
import z from "zod";
import { getSelectedExercisesNumbers } from '@/helpers/getExercisesById'

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
    res.status(StatusCodes.INTERNAL_SERVER_ERROR)
    res.json({ message: "Something went wrong" })
  }
}

export async function getUserSettings(req: Request, res: Response): Promise<void> {
  const userId = res.locals.jwtUser?.userId
  if (!userId) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Something went wrong" })
    return
  }
  try {
    const exerciseIdNumbers = await getSelectedExercisesNumbers(userId)

    res.status(StatusCodes.OK)
    res.json(exerciseIdNumbers)
  } catch (e) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR)
    res.json({ message: "Something went wrong" })
  }
}
