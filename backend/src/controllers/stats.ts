import { CompletedExercisesRepository } from "@/repositories/CompletedRepository";
import { StatusCodes } from "http-status-codes";
import type { Request, Response } from "express";
import { logger } from "@/logger";
import { KyselyTypeError } from "node_modules/kysely/dist/cjs/util/type-error";

export async function getUserStats(req: Request, res: Response): Promise<void> {
    const userId = res.locals.jwtUser?.userId
    if (!userId) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Something went wrong" })
        return
    }

    try {
        const exercise = await CompletedExercisesRepository.getCompletedExercises(userId);
        res.status(StatusCodes.OK);
        res.json(exercise);
    } catch (e) {
        console.error(e)
        res.status(StatusCodes.BAD_REQUEST);
        res.json({ message: "Exercises for given user id do not exist" });
    }
}
