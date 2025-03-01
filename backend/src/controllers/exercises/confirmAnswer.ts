import {
    DB_getExerciseById,
} from "@/repositories/ExerciseRepository";
import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import z from "zod";
import { ExerciseAnswerSchema } from '@/schemas/ExerciseSchema'
import { SettingsRepository } from "@/repositories/SettingsRepository";
import { replaceLatinCharacters } from "@/helpers/replaceLatinCharacters"
import { CompletedExercisesRepository } from "@/repositories/CompletedRepository";

// TODO: Cache user setings

export async function confirmAnswer(req: Request, res: Response): Promise<void> {
    try {
        const { id, answer, easyMode } = ExerciseAnswerSchema.parse(req.body)
        let isEasyMode = false

        if (res.locals.jwtUser) {
            const userSettings = await SettingsRepository.getUserSettings(res.locals.jwtUser.userId)
            if (userSettings) isEasyMode = userSettings?.easy_mode
        } else {
            isEasyMode = Boolean(easyMode)
        }

        try {
            const exercise = await DB_getExerciseById(Number(id));

            if (!exercise) {
                res.status(StatusCodes.BAD_REQUEST);
                res.json({ message: "Exercise with given id does not exist" });
                return
            }

            let isCorrect = exercise?.answer === answer

            if (isEasyMode) {
                const real_answer = replaceLatinCharacters(exercise?.answer)
                const user_answer = replaceLatinCharacters(answer)
                isCorrect = real_answer === user_answer
            }

            if (isCorrect && res.locals.jwtUser) {
                await CompletedExercisesRepository.saveExercise(res.locals.jwtUser.userId, exercise.id)
            }

            res.status(StatusCodes.OK);
            res.json({ correct: isCorrect });
        } catch {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR);
            res.json({ message: "Something went wrong and we don't know what" });
        }

    } catch (e) {
        if (e instanceof z.ZodError) {
            console.log(e.issues);
            res.status(StatusCodes.BAD_REQUEST)
            res.json({ message: "Payload has missing properties" })
            return
        }
        res.status(StatusCodes.INTERNAL_SERVER_ERROR)
        res.json({ message: "Something went wrong" })
    }
}
