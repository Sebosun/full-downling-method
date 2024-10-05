import {
  getExerciseById,
  getAllExercises,
} from "@/repositories/ExerciseRepository";
import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import z from "zod";
import { ExerciseAnswerSchema } from '@/schemas/ExerciseSchema'

export async function getExercise(req: Request, res: Response): Promise<void> {
  const id = req.params?.id;

  if (!id || !Number(id)) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: "Missing id" });
    return;
  }

  try {
    const exercise = await getExerciseById(Number(id));
    res.status(StatusCodes.OK);
    res.json(exercise);
  } catch (e) {
    res.status(StatusCodes.BAD_REQUEST);
    res.json({ message: "Exercise with given id does not exist" });
  }
}

export async function getExercises(_: Request, res: Response): Promise<void> {
  try {
    const exercises = await getAllExercises();
    res.status(StatusCodes.OK);
    res.json(exercises);
  } catch {
    res.status(StatusCodes.BAD_REQUEST);
    res.json({ message: "Exercise with given id does not exist" });
  }
}


export async function confirmAnswer(req: Request, res: Response): Promise<void> {
  try {
    const { id, answer } = ExerciseAnswerSchema.parse(req.body)

    try {
      const exercise = await getExerciseById(Number(id));
      res.status(StatusCodes.OK);

      res.status(StatusCodes.OK);
      res.json({ correct: exercise?.answer === answer });
    } catch (e) {
      res.status(StatusCodes.BAD_REQUEST);
      res.json({ message: "Exercise with given id does not exist" });
    }

  } catch (e) {
    if (e instanceof z.ZodError) {
      console.log(e.issues);
      res.status(StatusCodes.BAD_REQUEST)
      res.json({ message: "Payload has missing properties" })
      return
    }
    res.json({ message: "Something went wrong" })
  }
}
