import { db } from '@/database'
import { sql } from 'kysely'

export async function DB_getExerciseById(id: number) {
  return await db.selectFrom('exercises')
    .where('id', '=', id)
    .selectAll()
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
    .select(['id', 'question'])
    .executeTakeFirst()
}


