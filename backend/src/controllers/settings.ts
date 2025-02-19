import { StatusCodes } from "http-status-codes"
import { SelectedExercisesSchema } from '@/schemas/UserSettingsSchema'
import { SelectedExercises } from "@/types";
import { upsertSelectedExercises } from "@/repositories/SelectedExercisesRepository";
import type { Request, Response } from 'express';
import z from "zod";
import { getSelectedExercises } from "@/repositories/SelectedExercisesRepository";

// TOOD: rename to mention its updating exercises selection, not settings 
export async function updateUserExercises(req: Request, res: Response): Promise<void> {
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
    const response = {
        selected: upsertedExercises.map(({ exercise_id }) => exercise_id)
    }

    res.status(StatusCodes.OK)
    res.json(response)
  } catch (e) {
    if (e instanceof z.ZodError) {
      res.status(StatusCodes.BAD_REQUEST)
      res.json({ message: "Payload has missing properties" })
      return
    }
    res.status(StatusCodes.INTERNAL_SERVER_ERROR)
    res.json({ message: "Something went wrong" })
  }
}

export async function getUserExercises(_: Request, res: Response): Promise<void> {
  const userId = res.locals.jwtUser?.userId
  if (!userId) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Something went wrong" })
    return
  }
  try {
    const exerciseIdNumbers = await getSelectedExercises(userId)

    const settings = {
        selected: exerciseIdNumbers.map(({ exercise_id }) => exercise_id)
    }
    res.status(StatusCodes.OK)
    res.json(settings)
  } catch {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR)
    res.json({ message: "Something went wrong" })
  }
}
