import {
  DB_getExerciseById,
  DB_getAllExercises,
  DB_getRandomExercise
} from "@/repositories/ExerciseRepository";
import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import z from "zod";
import { ExerciseAnswerSchema } from '@/schemas/ExerciseSchema'
import { AllExercisesResponse } from "@/types/ExerciseTypes";

export async function getExercise(req: Request, res: Response): Promise<void> {
  const id = req.params?.id;

  if (!id || !Number(id)) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: "Missing id" });
    return;
  }

  try {
    const exercise = await DB_getExerciseById(Number(id));
    res.status(StatusCodes.OK);
    res.json(exercise);
  } catch (e) {
    res.status(StatusCodes.BAD_REQUEST);
    res.json({ message: "Exercise with given id does not exist" });
  }
}

export async function getRandomExercise(_: Request, res: Response): Promise<void> {
  try {
    const exercise = await DB_getRandomExercise();
    res.status(StatusCodes.OK);
    res.json(exercise);
  } catch (e) {
    res.status(StatusCodes.BAD_REQUEST);
    console.log(e)
    res.json({ message: "Couldn't generate random exercise" });
  }
}

export async function getExercises(_: Request, res: Response): Promise<void> {
  try {
    const exercises = await DB_getAllExercises();

    const acc = {
      first: {},
      second: {},
      third: {},
      fourth: {},
      fifth: {},
    } as AllExercisesResponse

    exercises.forEach(item => {
      const declension = item.declension
      const itemExists = !!acc[declension][item.base_word]
      if (!itemExists) {
        acc[declension][item.base_word] = {
          singular: [],
          plural: []
        }
        acc[declension][item.base_word][item.number].push(item)
      } else {
        acc[declension][item.base_word][item.number].push(item)
      }
    })
    res.status(StatusCodes.OK);
    res.json(acc);
  } catch (e) {
    console.error(e)
    res.status(StatusCodes.BAD_REQUEST);
    res.json({ message: "Exercise with given id does not exist" });
  }
}


export async function confirmAnswer(req: Request, res: Response): Promise<void> {
  try {
    const { id, answer } = ExerciseAnswerSchema.parse(req.body)

    try {
      const exercise = await DB_getExerciseById(Number(id));
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
