import { db } from '@/database'
import { Settings, SettingsUpdate } from '@/db_types'

async function getUserSettings(user_id: number) {
    return await db.selectFrom('user_settings')
        .where('user_id', '=', user_id)
        .selectAll()
        .executeTakeFirst()
}

async function upsertUserSettings(user_id: number, settings: Omit<Settings, 'user_id'>) {
    const { easy_mode, alt_exercise_label } = settings
    return await db.insertInto('user_settings')
        .values({ user_id, easy_mode, alt_exercise_label })
        .onDuplicateKeyUpdate({ easy_mode, alt_exercise_label })
        .execute()
}

async function updateUserSettings(userId: number, settings: Omit<SettingsUpdate, 'user_id'>) {
    return await db.updateTable('user_settings')
        .set(settings)
        .where('user_id', '=', userId)
        .execute()
}

export const SettingsRepository = {
    getUserSettings,
    upsertUserSettings,
    updateUserSettings
}
