import { SettingsRepository } from "@/repositories/SettingsRepository";
import { findAllUsers, findUserById } from "@/repositories/UserRepository";
import type { Request, Response } from 'express';
import { StatusCodes } from "http-status-codes";
import { getSelectedExercises } from "@/repositories/SelectedExercisesRepository";

export async function getAllUsers(_: Request, res: Response): Promise<void> {
    try {
        const users = await findAllUsers()
        res.status(StatusCodes.OK)
        res.json(users)
    } catch (e) {
        console.error(e)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR)
        res.json({ message: "Failed to get all users" })
    }
}

export async function getCurrentUser(_: Request, res: Response): Promise<void> {
    const userId = res.locals.jwtUser?.userId
    if (!userId) {
        res.status(StatusCodes.BAD_REQUEST).json({ message: "Missing user id" })
        return
    }

    try {
        const exercises = await getSelectedExercises(userId)
        const usrSettings = await SettingsRepository.getUserSettings(userId)
        const user = await findUserById(userId)
        const settings = {
            settings: usrSettings,
            exercises: exercises.map(({ exercise_id }) => exercise_id),
            user: user
        }
        res.status(StatusCodes.OK)
        res.json(settings)
    } catch (e) {
        console.error(e)
        res.status(StatusCodes.BAD_REQUEST)
        res.json({ message: "User with given id doesnt exist" })
    }
}
