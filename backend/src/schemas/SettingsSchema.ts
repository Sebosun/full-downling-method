import { z } from "zod";

export const SettingsSchema = z.object({
    easyMode: z.boolean().optional(),
    altExerciseLabel: z.boolean().optional()
}).refine(data => {
    const hasAnyVals = Object.values(data).some(value => value != undefined)
    return hasAnyVals
}, {
    message: " At least one field must be provided"
})
