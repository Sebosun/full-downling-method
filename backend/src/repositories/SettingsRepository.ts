import { db } from '@/database'

export async function getUserSettings(user_id: number) {
    return await db.selectFrom('user_settings')
        .where('user_id', '=', user_id)
        .selectAll()
        .executeTakeFirst()
}
