import { StatusCodes } from "http-status-codes"
import { SelectedExercisesSchema } from '@/schemas/UserSettingsSchema'
import { SettingsSchema } from '@/schemas/SettingsSchema'
import { SelectedExercises } from "@/db_types";
import { upsertSelectedExercises } from "@/repositories/SelectedExercisesRepository";
import type { Request, Response } from 'express';
import z from "zod";
import { getSelectedExercises } from "@/repositories/SelectedExercisesRepository";
import { SettingsRepository } from "@/repositories/SettingsRepository";
import { SettingsUpdate } from "@/db_types";

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
        const exercisesSelected = [] as SelectedExercises[]

        upsertedExercises.forEach(exercise => {
            if (exercise.selected) {
                exercisesSelected.push(exercise)
            }
        })

        const ids = [] as number[]

        exercisesSelected.forEach(exercise => {
            ids.push(exercise.exercise_id)
        })

        const response = {
            selected: ids
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

export async function updateUserSettings(req: Request, res: Response): Promise<void> {
    const userId = res.locals.jwtUser?.userId
    if (!userId) {
        res.status(StatusCodes.UNAUTHORIZED).json({ message: "User is not autorized for this action" })
        return
    }

    const schema = SettingsSchema.safeParse(req.body)
    if (!schema.success) {
        res.status(StatusCodes.OK)
        res.json(schema.error)
        return
    }

    try {
        if (schema.data.easyMode) {
            // TODO: result here returns abig int that throws when we try to send response
            // gotta think of a way to udpate and get an actual returned object, for later ig
            const payload: Omit<SettingsUpdate, 'user_id'> = {
                easy_mode: schema.data.easyMode,
                alt_exercise_label: schema.data.altExerciseLabel
            }
            await SettingsRepository.updateUserSettings(userId, payload)
            res.status(StatusCodes.OK)
            res.json()
            return
        }

        res.status(StatusCodes.OK)
        res.json()
    } catch (e) {
        console.error("Error inserting into database", e)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Something went wrong" })
        return
    }
}
