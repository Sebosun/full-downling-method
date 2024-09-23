import { getExerciseById, getAllExercises } from '@/repositories/ExerciseRepository';
import type { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export async function getExercise(req: Request, res: Response): Promise<void> {
  const id = req.params?.id

  if (!id || !Number(id)) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: "Missing id" })
    return
  }


  try {
    const exercise = await getExerciseById(Number(id))
    res.status(StatusCodes.OK)
    res.json(exercise)
  } catch (e) {
    res.status(StatusCodes.BAD_REQUEST)
    res.json({ message: "Exercise with given id does not exist" })
  }
}

export async function getExercises(_: Request, res: Response): Promise<void> {
  try {
    const exercises = await getAllExercises()
    res.status(StatusCodes.OK)
    res.json(exercises)
  } catch (e) {
    res.status(StatusCodes.BAD_REQUEST)
    res.json({ message: "Exercise with given id does not exist" })
  }
}
