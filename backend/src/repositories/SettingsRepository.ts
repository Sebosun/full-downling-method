import { db } from '@/database'


async function getUserSettings(user_id: number) {
  return await db.selectFrom('user_settings')
    .where('user_id', '=', user_id)
    .selectAll()
    .executeTakeFirst()
}

async function upsertUserSettings(user_id: number, easy_mode: boolean) {
  return await db.insertInto('user_settings')
    .values({ user_id, easy_mode })
    .onDuplicateKeyUpdate({ easy_mode })
    .execute()
}

async function updateUserSettings(user_id: number, easy_mode: boolean) {
  return await db.updateTable('user_settings')
      .set({
        easy_mode: easy_mode
      })
      .where('user_id', '=', user_id)
      .execute()
}

export const SettingsRepository = {
  getUserSettings,
  upsertUserSettings,
  updateUserSettings
}
