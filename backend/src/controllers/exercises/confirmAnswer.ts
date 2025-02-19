import {
    DB_getExerciseById,
} from "@/repositories/ExerciseRepository";
import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import z from "zod";
import { ExerciseAnswerSchema } from '@/schemas/ExerciseSchema'
import { getUserSettings } from "@/repositories/SettingsRepository";
import { replaceLatinCharacters } from "@/helpers/replaceLatinCharacters"

// TODO: Cache user setings

/**
 * Confirm answer to exercise
 * @param req - Request object
 * @param res - Response object
 * @returns void
 */
export async function confirmAnswer(req: Request, res: Response): Promise<void> {
    try {
        // TODO: option for non-logged in user to use easy-mode?
        const { id, answer } = ExerciseAnswerSchema.parse(req.body)
        let isEasyMode = false

        if (res.locals.jwtUser) {
            const userSettings = await getUserSettings(res.locals.jwtUser.userId)
            if (userSettings) isEasyMode = userSettings?.easy_mode
        }

        try {
            const exercise = await DB_getExerciseById(Number(id));

            if (!exercise) {
                res.status(StatusCodes.BAD_REQUEST);
                res.json({ message: "Exercise with given id does not exist" });
                return
            }

            if (isEasyMode) {
                const real_answer = replaceLatinCharacters(exercise?.answer)
                const user_answer = replaceLatinCharacters(answer)
                res.status(StatusCodes.OK);
                res.json({ correct: real_answer === user_answer });
                return
            }
            res.status(StatusCodes.OK);
            res.json({ correct: exercise?.answer === answer });
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
