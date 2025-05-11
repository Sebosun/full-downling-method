import { comparePasswds, encryptPassword } from "@/helpers/encryptPassword";
import { createUser, findUser } from "@/repositories/UserRepository";
import { UserCreateSchema, UserLoginSchema } from "@/schemas/UserSchema";
import type { Request, Response } from 'express';
import { StatusCodes } from "http-status-codes";
import { signJWT } from "@/helpers/jwt";
import { SettingsRepository } from "@/repositories/SettingsRepository";

export async function login(req: Request, res: Response) {
    const body = req.body;

    const result = UserLoginSchema.safeParse(body)

    if (!result.success) {
        res.status(StatusCodes.BAD_REQUEST).json({ message: "Invalid payload", errors: result.error })
        return
    }

    const { username, password } = result.data
    try {
        const user = await findUser(username.toLowerCase())
        if (!user) {
            res.status(StatusCodes.NOT_FOUND)
            res.json({ message: "User not found" })
            return
        }

        const isPasswdSame = await comparePasswds(password, user.password)
        if (!isPasswdSame) {
            res.status(StatusCodes.UNAUTHORIZED)
            res.json({ message: "Authorization failed" })
            return
        }

        const token = signJWT(user.id)

        res.status(200)
        res.json({ token })
    } catch (e) {
        console.error("Error while logging in", e)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR)
        res.json({ message: "Something went wrong" })
    }
}

export async function create(req: Request, res: Response): Promise<void> {
    const body = req.body;
    const result = UserCreateSchema.safeParse(body)

    if (!result.success) {
        res.status(StatusCodes.BAD_REQUEST).json({ message: "Invalid payload", errors: result.error })
        return
    }

    const { password, username } = result.data

    try {
        const hasUser = await findUser(username)

        if (hasUser) {
            res.status(StatusCodes.UNAUTHORIZED)
            res.json({ message: "User with this name already exists" })
            return
        }

        const hashedPasswd = await encryptPassword(password)
        const usr = await createUser({
            username: username,
            password: hashedPasswd,
        })

        // Create default settings
        try {
            await SettingsRepository.upsertUserSettings(usr.id, {
                easy_mode: false,
                alt_exercise_label: false
            })
        } catch (e) {
            console.error("Error while creating user settings", e)
            res.status(StatusCodes.INTERNAL_SERVER_ERROR)
            res.json({ message: "Something went wrong" })
            return
        }

        res.status(StatusCodes.OK)
        res.json(usr)

    } catch (e) {
        console.error(e)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR)
        res.json({ message: "Failure to verify user" })
    }
}
