import { db } from '@/database'
import { sql } from 'kysely'

export async function DB_getExerciseById(id: number) {
    return await db.selectFrom('exercises')
        .where('id', '=', id)
        .selectAll()
        .executeTakeFirst()
}

const selectArr = ['id', 'question', 'case', 'number', 'base_word'] as const

export async function DB_getExerciseAsQuestion(id: number) {
    return await db.selectFrom('exercises')
        .where('id', '=', id)
        .select(selectArr)
        .executeTakeFirst()
}

export async function DB_getAllExercises() {
    return await db.selectFrom('exercises')
        .selectAll()
        .execute()
}

export async function DB_getRandomExercise() {
    return await db.selectFrom('exercises')
        .orderBy(sql`random()`)
        .select(selectArr)
        .executeTakeFirst()
}

export async function DB_getExercisesWithUserIds(user_id: number) {
    const randomId = await db.selectFrom('selected_exercises')
        .where('user_id', '=', user_id)
        .where('selected', '=', true)
        .orderBy(sql`random()`)
        .select('exercise_id')
        .executeTakeFirst()

    if (!randomId?.exercise_id) {
        throw new Error('Missing exercise id')
    }

    return await db.selectFrom('exercises')
        .where('id', '=', randomId.exercise_id)
        .orderBy(sql`random()`)
        .select(selectArr)
        .executeTakeFirst()
}
