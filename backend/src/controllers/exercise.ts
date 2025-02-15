import {
  DB_getExerciseById,
  DB_getAllExercises,
  DB_getRandomExercise,
  getExercisesWithUserIds
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
  } catch {
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

export async function getRandomExerciseLoggedIn(_: Request, res: Response): Promise<void> {
  const userId = res.locals.jwtUser?.userId
  if (!userId) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Something went wrong" })
    return
  }

  try {
    const exercise = await getExercisesWithUserIds(userId);
    res.status(StatusCodes.OK);
    res.json(exercise);
  } catch (e) {
    if (e instanceof Error) {
      if (e.message === 'Missing exercise id') {
        res.status(StatusCodes.BAD_REQUEST);
        res.json({ message: "User has no settings set" });
        return
      }
    }
    res.status(StatusCodes.INTERNAL_SERVER_ERROR);
    res.json({ message: "Couldn't generate random exercise" });
  }
}

export async function getExercises(_: Request, res: Response): Promise<void> {
  try {
    const exercises = await DB_getAllExercises();

    const acc = {
      first: [],
      second: [],
      third: [],
      fourth: [],
      fifth: [],
    } as AllExercisesResponse

    exercises.forEach(exercise => {
      const declension = exercise.declension
      let exIdx = acc[declension].findIndex(el => el.name === exercise.base_word)
      if (exIdx === -1) {
        acc[declension].push({
          name: exercise.base_word,
          gender: exercise.gender,
          part_of_speech: 'noun',
          singular: [],
          plural: []
        })
        // in newly created its always going to be the last item : )
        exIdx = acc[declension].length - 1
      }
      acc[declension][exIdx][exercise.number].push(exercise)
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
    } catch {
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
