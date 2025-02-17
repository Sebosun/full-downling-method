import { z } from "zod";

export const UserLoginSchema = z.object({
    username: z.string(),
    password: z.string(),
})

export const UserCreateSchema = z.object({
    username: z.string().min(2),
    password: z.string().min(6).max(100).regex(/[a-zA-Z]/),
})
