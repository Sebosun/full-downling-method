import { z } from "zod";

export const UserSettingsSchema = z.object({
  exercises: z.number().array().nonempty()
})
