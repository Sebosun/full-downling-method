import { db } from '@/database'

export async function getExerciseById(id: number) {
  return await db.selectFrom('exercises')
    .where('id', '=', id)
    .selectAll()
    .executeTakeFirst()
}

export async function getAllExercises() {
  return await db.selectFrom('exercises')
    .selectAll()
    .execute()
}
