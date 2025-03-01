import { db } from '@/database'

async function getCompletedExercises(user_id: number) {
    return await db.selectFrom('completed_exercises')
        .where('user_id', '=', user_id)
        .selectAll()
        .execute()
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
