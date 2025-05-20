import { db } from '@/database'
import { sql } from 'kysely'

async function getCompletedExercises(user_id: number) {
    return await db
        .selectFrom('completed_exercises')
        .select([
            sql`DATE(created_at::timestamp)`.as('date'),
            sql`COUNT(*)`.as('count')
        ])
        .where("user_id", "=", user_id)
        .where(
            // @ts-expect-error - wrong types in kysely apparently
            sql`created_at::timestamp >= CURRENT_DATE - INTERVAL '365 days'`
        )
        .groupBy(sql`DATE(created_at::timestamp)`)
        .orderBy('date')
        .execute();
}

async function saveExercise(user_id: number, exercise_id: number) {
    return await db.insertInto('completed_exercises')
        .values({ user_id, exercise_id })
        .execute()
}


export const CompletedExercisesRepository = {
    getCompletedExercises,
    saveExercise
}
